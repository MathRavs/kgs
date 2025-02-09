import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Vault from 'node-vault';
import { VaultSecrets } from '@core/configuration/types/vault.type';
import { AbstractVaultService } from '@core/configuration/services/abstract/abstract-vault.service';

@Injectable()
export class VaultService extends AbstractVaultService {
  private readonly vaultClient: Vault.client;

  @Inject()
  private readonly logger: Logger;

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
      this.logger.debug('Authenticating vault', this.constructor.name);

      const result = await this.vaultClient.approleLogin({
        role_id: process.env.VAULT_ROLE_ID,
        secret_id: process.env.VAULT_SECRET_ID,
      });
      this.logger.debug('Authenticating done', this.constructor.name);
      this.vaultClient.token = result.auth.client_token;
      this.logger.debug('Authenticating done', this.constructor.name);
    } catch (error) {
      this.logger.error('Authentication error', error, this.constructor.name);
      throw error;
    }
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
