import { VaultSecrets } from '@core/configuration/types/vault.type';

export abstract class AbstractVaultService {
  abstract getSecrets(path: string): Promise<VaultSecrets>;
}
