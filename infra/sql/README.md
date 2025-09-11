# Azure SQL Setup

## Create Server and Database
- `az group create --name beacon-rg --location eastus`
- `az sql server create --name beacon-financemart --resource-group beacon-rg --location eastus --admin-user <admin> --admin-password <password>`
- `az sql db create --name Beacon-FinanceMart --server beacon-financemart --resource-group beacon-rg`

## Configure Firewall
- `az sql server firewall-rule create --resource-group beacon-rg --server beacon-financemart --name AllowMyIP --start-ip-address <dev-ip> --end-ip-address <dev-ip>`
- `az sql server firewall-rule create --resource-group beacon-rg --server beacon-financemart --name AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0`

## Run Migrations and Seeds
- `export SQL_SERVER=beacon-financemart.database.windows.net`
- `export SQL_DB=Beacon-FinanceMart`
- `export SQL_USER=<admin>`
- `export SQL_PASSWORD=<password>`
- `export NODE_OPTIONS=--loader=ts-node/esm`
- `npm run db:migrate`
- `npm run db:seed`

## Store Secrets in Key Vault
- `az keyvault create --name beacon-kv --resource-group beacon-rg --location eastus`
- `az keyvault secret set --vault-name beacon-kv --name SQL-SERVER --value "$SQL_SERVER"`
- `az keyvault secret set --vault-name beacon-kv --name SQL-DB --value "$SQL_DB"`
- `az keyvault secret set --vault-name beacon-kv --name SQL-USER --value "$SQL_USER"`
- `az keyvault secret set --vault-name beacon-kv --name SQL-PASSWORD --value "$SQL_PASSWORD"`
