# NEAR Social JS Documentation

## Fetching Profile Data

The `@builddao/near-social-js` library provides a `Social` class for interacting with NEAR Social's SocialDB.

### Basic Usage

```typescript
import { SocialDBContract } from '@builddao/near-social-js';

// Initialize contract
const socialDb = new Social();

// Fetch profile data
async function getProfile(accountId: string) {
  try {
    return await socialDb.get(`${accountId}/profile`);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}
```

### Methods
- `get(key: string)` - Returns profile data for the specified key
- `keys()` - List all available keys
- `view()` - Get complete social data structure

### Example Response Structure
```json
{
  "name": "Sleet Design",
  "description": "Web3 playground project",
  "linktree": {
    "github": "sleetplayground",
    "twitter": "sleetname"
  }
}
```