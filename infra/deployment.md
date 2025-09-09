# Deployment Overview

## Next.js Admin App

- Deploy to Azure Static Web Apps or App Service.
- Set `API_URL` in environment variables or configuration.

## Express API

- Deploy to Azure App Service or a container.
- Expose port `4000`.
- Apply required environment variables (e.g., database and Service Bus connection strings).

## Azure Functions Worker

- Deploy `apps/worker` to an Azure Functions App.
- Connect the Functions App to the Service Bus.

## Connectivity Verification

- Ensure all services can reach the database.
- Ensure all services can reach the Service Bus.
