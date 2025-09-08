# Azure Service Bus Setup

## Namespace and Queues

- `az servicebus namespace create --resource-group <resource-group> --name <namespace> --location <region> --sku Standard`
- `az servicebus queue create --resource-group <resource-group> --namespace-name <namespace> --name vendor-upsert`
- `az servicebus queue create --resource-group <resource-group> --namespace-name <namespace> --name project-create`

## Connection String

- `az servicebus namespace authorization-rule create --resource-group <resource-group> --namespace-name <namespace> --name send-listen --rights Send Listen`
- `az servicebus namespace authorization-rule keys list --resource-group <resource-group> --namespace-name <namespace> --name send-listen --query primaryConnectionString --output tsv`

## Secrets

- `az keyvault secret set --vault-name <key-vault> --name SB-CONNECTION-STRING --value "<connection-string>"`
- Update `.env` or Key Vault with:
  - `SB_CONNECTION_STRING=<connection-string>`
  - `SB_QUEUE_VENDOR_UPSERT=vendor-upsert`
  - `SB_QUEUE_PROJECT_CREATE=project-create`
