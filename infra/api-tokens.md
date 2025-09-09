# API tokens

## QuickBooks Online
- Sign in to [Intuit Developer](https://developer.intuit.com/).
- Create an app with Accounting scope.
- Set the redirect URI used by Lighthouse.
- Copy **Client ID** and **Client Secret**.
- Authorize the app to capture **Realm ID** and **Refresh Token**.
- Store in Key Vault or `.env` using:
  - `QBO_CLIENT_ID`
  - `QBO_CLIENT_SECRET`
  - `QBO_REDIRECT_URI`
  - `QBO_REALM_ID`
  - `QBO_REFRESH_TOKEN`

## HubSpot
- In HubSpot, go to *Settings → Integrations → Private Apps*.
- Create a private app and copy its token.
- Store as `HUBSPOT_PRIVATE_APP_TOKEN` in Key Vault or `.env`.

## Connecteam
- In the Connecteam admin console, open *API* settings.
- Generate an API token.
- Store as `CONNECTEAM_API_TOKEN` in Key Vault or `.env`.
