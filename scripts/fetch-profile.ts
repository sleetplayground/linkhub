#!/usr/bin/env node

interface ProfileData {
  name?: string;
  description?: string;
  image?: { url?: string; ipfs_cid?: string };
  backgroundImage?: { url?: string; ipfs_cid?: string };
  linktree?: Record<string, string>;
  tags?: Record<string, string>;
}

async function fetchProfile(accountId: string) {
  try {
    const response = await fetch('https://rpc.web4.near.page/account/social.near/view/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keys: [`${accountId}/profile/**`]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data[accountId]) {
      console.log(`No profile found for ${accountId}`);
      process.exit(0);
    }

    console.log('Raw response:', JSON.stringify(data, null, 2));

    const profile = data[accountId]?.profile as ProfileData;
    if (!profile) {
      console.log(`No profile data found for ${accountId}`);
      process.exit(0);
    }

    console.log('=== Profile Details ===\n');
    console.log(`Account: ${accountId}`);
    console.log(`Name: ${profile.name || 'Not specified'}`);
    
    if (profile.image?.url || profile.image?.ipfs_cid) {
      const imageUrl = profile.image.url ? 
        (profile.image.url.startsWith('http') ? profile.image.url : `https://ipfs.near.social/ipfs/${profile.image.url}`) :
        `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`;
      console.log('\nProfile Image:')
      console.log(`  ${imageUrl}`);
    } else {
      console.log('\nProfile Image: Not set');
    }

    if (profile.backgroundImage?.url || profile.backgroundImage?.ipfs_cid) {
      const bgImageUrl = profile.backgroundImage.url ? 
        (profile.backgroundImage.url.startsWith('http') ? profile.backgroundImage.url : `https://ipfs.near.social/ipfs/${profile.backgroundImage.url}`) :
        `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`;
      console.log('\nBackground Image:')
      console.log(`  ${bgImageUrl}`);
    }
    
    if (profile.description) {
      console.log('\nDescription:', profile.description);
    }
    
    if (profile.linktree && Object.keys(profile.linktree).length > 0) {
      console.log('\nSocial Links:');
      Object.entries(profile.linktree).forEach(([platform, value]) => {
        console.log(`  - ${platform}: ${value}`);
      });
    }

    if (profile.tags && Object.keys(profile.tags).length > 0) {
      console.log('\nTags:');
      Object.keys(profile.tags).forEach(tag => {
        console.log(`  - ${tag}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    process.exit(1);
  }
}

// Execute for sleet.near
fetchProfile('sleet.near');