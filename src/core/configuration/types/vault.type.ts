export interface VaultSecrets {
  redis_url: string;
  bcrypt_salt: number;
  jwt_secret: string;
  postgres_url: string;
}
