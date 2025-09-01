import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

// Check if UploadThing is properly configured
const isUploadThingConfigured = () => {
  return !!(process.env.UPLOADTHING_SECRET && process.env.UPLOADTHING_APP_ID);
};

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export { isUploadThingConfigured };
