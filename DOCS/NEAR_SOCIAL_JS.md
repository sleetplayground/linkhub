# Using @builddao/near-social-js

This guide explains how to use the @builddao/near-social-js library to interact with NEAR Social data, including fetching profile information and social links.

## Installation

```bash
pnpm add @builddao/near-social-js
```

## Basic Usage

Here's a basic example of how to fetch a NEAR account's profile data:

```typescript
import { NearSocialJS } from '@builddao/near-social-js';

// Initialize the client
const nearSocial = new NearSocialJS({
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
});

// Fetch profile data
async function getProfileData(accountId: string) {
  try {
    const profile = await nearSocial.getProfile(accountId);
    console.log('Profile data:', profile);
    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Example usage
getProfileData('sleet.near');
```

## Sample Script

Create a new file `scripts/fetch-profile.ts` with the following content to test fetching profile data:

```typescript
import { NearSocialJS } from '@builddao/near-social-js';

const ACCOUNT_ID = 'sleet.near';

async function main() {
  const nearSocial = new NearSocialJS({
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
  });

  try {
    // Fetch basic profile data
    const profile = await nearSocial.getProfile(ACCOUNT_ID);
    console.log('\nProfile Data:');
    console.log(JSON.stringify(profile, null, 2));

    // Fetch social links
    const links = await nearSocial.get(
      `${ACCOUNT_ID}/profile/links/**`
    );
    console.log('\nSocial Links:');
    console.log(JSON.stringify(links, null, 2));

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Running the Script

1. Create a `scripts` directory in your project root
2. Save the script as `fetch-profile.ts`
3. Run the script:
```bash
pnpm tsx scripts/fetch-profile.ts
```

## Common Operations

### Get Specific Profile Fields
```typescript
const name = await nearSocial.get(`${accountId}/profile/name`);
const image = await nearSocial.get(`${accountId}/profile/image`);
```

### Get Social Links
```typescript
const links = await nearSocial.get(`${accountId}/profile/links/**`);
```

### Get Posts or Content
```typescript
const posts = await nearSocial.get(`${accountId}/post/**`);
```

## Error Handling

Always wrap your calls in try-catch blocks to handle potential errors:

```typescript
try {
  const profile = await nearSocial.getProfile(accountId);
  // Process profile data
} catch (error) {
  if (error.message.includes('account not found')) {
    console.error('Account does not exist');
  } else {
    console.error('Error fetching profile:', error);
  }
}
```

## Best Practices

1. Always handle errors appropriately
2. Cache results when making multiple calls
3. Use appropriate timeouts for network calls
4. Consider rate limiting for bulk operations
5. Validate account IDs before making calls