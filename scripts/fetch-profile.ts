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