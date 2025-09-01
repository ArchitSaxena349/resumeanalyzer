"use client";

import { useEffect } from "react";

export default function ErrorSuppression() {
  useEffect(() => {
    // Suppress specific UploadThing errors that don't affect functionality
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Suppress known UploadThing initialization errors
      if (
        message.includes('UploadThingError') ||
        message.includes('ut-reporter') ||
        message.includes('Hydration failed') ||
        message.includes('cz-shortcut-listen') ||
        message.includes('server rendered HTML didn\'t match')
      ) {
        return;
      }
      
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Suppress UploadThing warnings
      if (
        message.includes('UploadThing') ||
        message.includes('uploadthing')
      ) {
        return;
      }
      
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}