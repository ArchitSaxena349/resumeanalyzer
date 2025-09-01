// Configuration checks for the application
export const config = {
  uploadthing: {
    isConfigured: () => {
      if (typeof window !== 'undefined') {
        // Client-side check
        return true; // Always return true on client to avoid hydration issues
      }
      // Server-side check
      return !!(
        (process.env.UPLOADTHING_SECRET || process.env.UPLOADTHING_TOKEN) && 
        process.env.UPLOADTHING_APP_ID
      );
    }
  },
  openai: {
    isConfigured: () => {
      if (typeof window !== 'undefined') {
        return true; // Always return true on client to avoid hydration issues
      }
      return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';
    }
  },
  gemini: {
    isConfigured: () => {
      if (typeof window !== 'undefined') {
        return true; // Always return true on client to avoid hydration issues
      }
      return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here';
    }
  }
};