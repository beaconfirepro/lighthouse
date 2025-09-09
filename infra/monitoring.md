# Monitoring

## Application Insights

- `az monitor app-insights component create --app <app-name> --location <region> --resource-group <resource-group> --workspace <log-analytics-workspace>`
- Set `APPLICATIONINSIGHTS_CONNECTION_STRING` or `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING` via Key Vault.

## Alerts

### Errors

- `az monitor metrics alert create --resource-group <resource-group> --name app-error-alert --scopes <app-insights-resource-id> --condition "sum(exceptions/server) > 0" --window-size 5m --evaluation-frequency 1m --action-group <action-group>`

### Resource Health

- `az monitor metrics alert create --resource-group <resource-group> --name resource-health-alert --scopes <resource-id> --condition "avg(HealthStatus) < 1" --window-size 5m --evaluation-frequency 1m --action-group <action-group>`

## Log Retention

- `az monitor app-insights component update --app <app-name> --resource-group <resource-group> --retention-time 30`
- Query logs in the linked Log Analytics workspace for troubleshooting.
