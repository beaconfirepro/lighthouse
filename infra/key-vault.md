# Azure Key Vault Setup

## Vault

- `az keyvault create --name <key-vault> --resource-group <resource-group> --location <region>`
- `az deployment group create --resource-group <resource-group> --template-file infra/bicep/key-vault.bicep \\
    --parameters keyVaultName=<key-vault> apiPort=<api-port> sqlServer=<sql-server> sqlDb=<sql-db> sqlUser=<sql-user> sqlPassword=<sql-password>`

## Managed Identities

- `az webapp identity assign --resource-group <resource-group> --name <web-app>`
- `az functionapp identity assign --resource-group <resource-group> --name <function-app>`
- `az keyvault set-policy --name <key-vault> --object-id <web-app-principal> --secret-permissions get list`
- `az keyvault set-policy --name <key-vault> --object-id <function-app-principal> --secret-permissions get list`

## Secrets

- `az keyvault secret set --vault-name <key-vault> --name API-PORT --value "<api-port>"`
- `az keyvault secret set --vault-name <key-vault> --name SQL-SERVER --value "<sql-server>"`
- `az keyvault secret set --vault-name <key-vault> --name SQL-DB --value "<sql-db>"`
- `az keyvault secret set --vault-name <key-vault> --name SQL-USER --value "<sql-user>"`
- `az keyvault secret set --vault-name <key-vault> --name SQL-PASSWORD --value "<sql-password>"`
- `az keyvault secret set --vault-name <key-vault> --name SQL-ENCRYPT --value "true"`

## App Settings

- Add `KEY_VAULT_URL=https://<key-vault>.vault.azure.net` to each service configuration.
