param location string = resourceGroup().location
param keyVaultName string
param accessObjectIds array = []
@secure()
param apiPort string
@secure()
param sqlServer string
@secure()
param sqlDb string
@secure()
param sqlUser string
@secure()
param sqlPassword string
@secure()
param sqlEncrypt string = 'true'

resource kv 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    accessPolicies: [for id in accessObjectIds: {
      tenantId: subscription().tenantId
      objectId: id
      permissions: {
        secrets: ['get', 'list']
      }
    }]
  }
}

resource apiPortSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/API-PORT'
  properties: {
    value: apiPort
  }
}

resource sqlServerSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/SQL-SERVER'
  properties: {
    value: sqlServer
  }
}

resource sqlDbSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/SQL-DB'
  properties: {
    value: sqlDb
  }
}

resource sqlUserSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/SQL-USER'
  properties: {
    value: sqlUser
  }
}

resource sqlPasswordSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/SQL-PASSWORD'
  properties: {
    value: sqlPassword
  }
}

resource sqlEncryptSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: '${kv.name}/SQL-ENCRYPT'
  properties: {
    value: sqlEncrypt
  }
}
