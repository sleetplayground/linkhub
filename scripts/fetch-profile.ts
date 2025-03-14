#!/usr/bin/env node
import { Social } from '@builddao/near-social-js';

async function fetchProfile(accountId: string) {
  try {
    const socialDb = new Social();
    const profile = await socialDb.get(`${accountId}/profile`);
    
    console.log(`Profile data for ${accountId}:`);
    console.log(JSON.stringify(profile, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    process.exit(1);
  }
}

// Execute for sleet.near
fetchProfile('sleet.near');