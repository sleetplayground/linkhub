#!/usr/bin/env node
import pkg from '@builddao/near-social-js';
const { Social } = pkg;

interface ProfileData {
  name?: string;
  description?: string;
  image?: { url: string };
  linktree?: Record<string, string>;
}

interface NearSocialConfig {
  network: string;
  contractName: string;
  nodeUrl: string;
  apiUrl: string;
}

async function fetchProfile(accountId: string) {
  try {
    // Initialize the API with proper configuration
    const config: NearSocialConfig = {
      network: 'mainnet',
      contractName: 'social.near',
      nodeUrl: 'https://rpc.mainnet.near.org',
      apiUrl: 'https://api.near.social'
    };

    const socialDb = new Social(config);
    const query = `${accountId}/profile/**`;
    const response = await socialDb.get(query).catch(error => {
      if (error.message.includes('Missing keys')) {
        return null;
      }
      throw error;
    });

    if (!response) {
      console.log(`No profile found for ${accountId}`);
      process.exit(0);
    }

    const profile = response as ProfileData;
    console.log('=== Profile Details ===\n');
    console.log(`Account: ${accountId}`);
    console.log(`Name: ${profile.name || 'Not specified'}`);
    
    if (profile.image?.url) {
      console.log(`Image URL: ${profile.image.url}`);
    }
    
    if (profile.description) {
      console.log(`Description: ${profile.description}`);
    }
    
    if (profile.linktree && Object.keys(profile.linktree).length > 0) {
      console.log('\nSocial Links:');
      Object.entries(profile.linktree).forEach(([platform, value]) => {
        console.log(`  - ${platform}: ${value}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    process.exit(1);
  }
}

// Execute for sleet.near
fetchProfile('mob.near');