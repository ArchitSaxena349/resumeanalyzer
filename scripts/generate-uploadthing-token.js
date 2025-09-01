#!/usr/bin/env node

/**
 * Generate UploadThing Token
 * 
 * This script generates a properly formatted base64 encoded token for UploadThing.
 * Usage: node scripts/generate-uploadthing-token.js <secret> <appId> [region]
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node generate-uploadthing-token.js <secret> <appId> [region]');
  console.error('Example: node generate-uploadthing-token.js sk_live_xxx your_app_id fra1');
  process.exit(1);
}

const [secret, appId, region = 'fra1'] = args;

const tokenData = {
  apiKey: secret,
  appId: appId,
  regions: [region]
};

const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

console.log('Generated UploadThing Token:');
console.log('UPLOADTHING_TOKEN=' + token);
console.log('');
console.log('Add this to your .env file:');
console.log(`UPLOADTHING_SECRET=${secret}`);
console.log(`UPLOADTHING_TOKEN=${token}`);
console.log(`UPLOADTHING_APP_ID=${appId}`);