import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Check if UploadThing is properly configured
export const isUploadThingConfigured = () => {
  return !!(
    process.env.UPLOADTHING_SECRET && 
    process.env.UPLOADTHING_APP_ID &&
    process.env.UPLOADTHING_SECRET !== 'your_uploadthing_secret_here' &&
    process.env.UPLOADTHING_APP_ID !== 'your_uploadthing_app_id_here'
  );
};

// Lazy load UploadThing helpers only when configured
export const getUploadThingHelpers = async () => {
  if (!isUploadThingConfigured()) {
    throw new Error('UploadThing is not configured');
  }
  
  try {
    const { generateReactHelpers } = await import("@uploadthing/react");
    return generateReactHelpers<OurFileRouter>();
  } catch (error) {
    console.error('Failed to load UploadThing helpers:', error);
    throw error;
  }
};

// Safe hook that handles errors gracefully
export const useSafeUploadThing = (endpoint: keyof OurFileRouter, options?: any) => {
  if (typeof window === 'undefined') {
    // Server-side: return mock functions
    return {
      startUpload: async () => null,
      isUploading: false,
    };
  }

  try {
    if (!isUploadThingConfigured()) {
      return {
        startUpload: async () => {
          throw new Error('UploadThing is not configured');
        },
        isUploading: false,
      };
    }

    // Dynamic import to avoid loading UploadThing on server
    const { useUploadThing } = require("@/utils/uploadthing");
    return useUploadThing(endpoint, options);
  } catch (error) {
    console.warn('UploadThing initialization failed:', error);
    return {
      startUpload: async () => {
        throw new Error('UploadThing failed to initialize');
      },
      isUploading: false,
    };
  }
};