Vault configuration for local development

- docker compose up -d
- docker ps
- identify the hashicorp/vault:latest image
- docker exec -it theIdHere sh
- vault secrets enable -version=2 kv
- vault operator init
- store the keys
- Unseal vault
  `vault operator unseal <key1>
vault operator unseal <key2>
vault operator unseal <key3>`
- vault login {root Api key}
- vault enable approle
- create vault token
  `vault write auth/approle/role/my-role \
  token_type=batch \
  secret_id_ttl=10m \
  token_ttl=20m \
  token_max_ttl=30m \
  secret_id_num_uses=40`
- retrieve vault role id
  `vault read auth/approle/role/my-role/role-id`
- navigate to vault gui (localhost:8200) and add the secrets inside the kgs-secrets path
  `    {
  "redis_url": "redis://:redis@localhost:6379",
  "bcrypt_salt":10,
  "email": {
    "password": "3rk61nZNrZMaFzB32w",
    "username": "matilde78@ethereal.email"
  },
    "jwt_secret": "tokeny",
    "postgres_url": "postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
  }`
  - Add the policy
    `vault policy write kgs-policy -<<EOF
path "kv/data/kgs-secrets" {
  capabilities = ["read"]
}`
  - Grant the policy to the user
    `vault write auth/approle/role/my-role policies="kgs-policy"`
  - retrieve secret ids
    `vault write -f auth/approle/role/my-role/secret-id`
  - vault write auth/approle/role/my-role secret_id_ttl=3d
  - add the role id and the secret id to the env file
    ( the only configurations you need to run your project)
