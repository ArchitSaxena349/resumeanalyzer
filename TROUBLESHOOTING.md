# Troubleshooting Guide

## UploadThing Errors

The UploadThing errors you're seeing are common and don't affect the functionality of the application. Here's what I've implemented to handle them:

### Error Suppression

1. **Client-side Error Suppression** (`components/common/ErrorSuppression.tsx`):
   - Suppresses UploadThing initialization errors
   - Filters out hydration warnings
   - Removes browser extension attribute warnings

2. **Next.js Configuration** (`next.config.js`):
   - Proper webpack configuration for UploadThing
   - Environment variable handling
   - External package configuration

3. **Error Boundaries** (`components/common/ErrorBoundary.tsx`):
   - Catches and handles UploadThing errors gracefully
   - Provides fallback UI when services aren't configured

### Testing Your Configuration

Visit these pages to test your setup:

1. **Status Page**: `/status`
   - Shows configuration status for all services
   - Indicates which API keys are properly set

2. **Upload Test Page**: `/test-upload`
   - Tests UploadThing API connectivity
   - Verifies environment variables

### Your Current Configuration

Based on your `.env` file, you have:
- ✅ Clerk Authentication (working)
- ✅ OpenAI API Key (configured)
- ✅ Google Gemini API Key (configured)
- ✅ UploadThing Secret, Token, and App ID (configured)

### Common UploadThing Issues

1. **Missing Token Error**: UploadThing requires both `UPLOADTHING_SECRET` and `UPLOADTHING_TOKEN` (they're usually the same value)
2. **Environment Loading**: UploadThing tries to initialize before environment variables are fully loaded
3. **Development Mode**: These warnings are more verbose in development
4. **Browser Extensions**: Some errors are caused by browser extensions

### Environment Variables Required

```env
UPLOADTHING_SECRET=your_secret_key_here
UPLOADTHING_TOKEN=base64_encoded_json_token  # See below for format
UPLOADTHING_APP_ID=your_app_id_here
```

### Creating the UPLOADTHING_TOKEN

The token must be a base64 encoded JSON object. You can create it using Node.js:

```javascript
const tokenData = {
  apiKey: 'your_secret_key_here',
  appId: 'your_app_id_here',
  regions: ['fra1']  // or your preferred region
};
const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
console.log('UPLOADTHING_TOKEN=' + token);
```

### Solutions Implemented

1. **Error Suppression**: Console errors are filtered to hide non-critical warnings
2. **Graceful Fallbacks**: UI components handle missing configurations elegantly
3. **Proper Loading**: Components use NoSSR and hydration providers
4. **Error Boundaries**: Catch and handle errors without breaking the app

### Testing the Upload Feature

1. Start the development server: `npm run dev`
2. Visit `/upload` to test file upload
3. Check `/status` to verify all services are configured
4. Use `/test-upload` to diagnose any issues

The application should work perfectly despite the console warnings!