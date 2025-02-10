import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Vault from 'node-vault';
import { VaultSecrets } from '@core/configuration/types/vault.type';
import { AbstractVaultService } from '@core/configuration/services/abstract/abstract-vault.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VaultService extends AbstractVaultService {
  private readonly vaultClient: Vault.client;

  @Inject()
  private readonly logger: Logger;

  @Inject()
  private readonly httpService: HttpService;

  constructor() {
    super();
    this.vaultClient = Vault({
      apiVersion: 'v1',
      endpoint: process.env.VAULT_ADDR || 'http://127.0.0.1:8200', // Vault endpoint
    });
  }

  private async getClient(): Promise<Vault.client> {
    if (!this.vaultClient.token) {
      await this.authenticateWithAppRole();
    }
    return this.vaultClient;
  }

  private async authenticateWithAppRole(): Promise<void> {
    try {
      const secretID = await this.generateSecretId();

      this.logger.debug('Authenticating vault', this.constructor.name);

      const result = await this.vaultClient.approleLogin({
        role_id: process.env.VAULT_ROLE_ID,
        secret_id: secretID,
      });

      this.logger.debug('Authenticating done', this.constructor.name);
      this.vaultClient.token = result.auth.client_token;
      this.logger.debug('Authenticating done', this.constructor.name);
    } catch (error) {
      this.logger.error('Authentication error', error, this.constructor.name);
      throw error;
    }
  }

  private async generateSecretId() {
    const bootstrapToken = process.env.VAULT_BOOTSTRAP_TOKEN;

    this.logger.debug('creating secret id', this.constructor.name);

    const response = await firstValueFrom<{
      data: { data: { secret_id: string } };
    }>(
      this.httpService.post(
        `${process.env.VAULT_ADDR}/v1/auth/approle/role/my-role/secret-id`,
        {},
        {
          headers: { 'X-Vault-Token': bootstrapToken },
        },
      ),
    );

    this.logger.debug('secret id created', this.constructor.name);

    return response.data.data.secret_id;
  }

  async getSecrets(path: string): Promise<VaultSecrets> {
    const client = await this.getClient();
    try {
      this.logger.debug('Retrieving secrets', this.constructor.name);
      const result = await client.read(path);
      return result.data.data;
    } catch (error) {
      this.logger.error(
        'Secrets retrieval error',
        error,
        this.constructor.name,
      );
      throw error;
    }
  }
}
