import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

// Loads secrets into process.env from Azure Key Vault using managed identity.
export async function loadSecrets(names: string[]): Promise<void> {
  const url = process.env.KEY_VAULT_URL;
  if (!url) throw new Error('KEY_VAULT_URL is not set');

  const credential = new DefaultAzureCredential();
  const client = new SecretClient(url, credential);

  for (const envName of names) {
    const secretName = envName.replace(/_/g, '-');
    const { value } = await client.getSecret(secretName);
    if (value !== undefined) process.env[envName] = value;
  }
}
