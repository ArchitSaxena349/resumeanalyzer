"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [status, setStatus] = useState<string>("Ready to test");

  const testUploadThingConfig = async () => {
    setStatus("Testing UploadThing configuration...");
    
    try {
      // Test if the API route is accessible
      const response = await fetch('/api/uploadthing', {
        method: 'GET',
      });
      
      if (response.ok) {
        setStatus("✅ UploadThing API route is accessible");
      } else {
        setStatus(`❌ UploadThing API route error: ${response.status}`);
      }
    } catch (error) {
      setStatus(`❌ UploadThing test failed: ${error}`);
    }
  };

  const checkEnvVars = () => {
    const hasSecret = !!process.env.UPLOADTHING_SECRET;
    const hasToken = !!process.env.UPLOADTHING_TOKEN;
    const hasAppId = !!process.env.UPLOADTHING_APP_ID;
    
    // Try to validate token format
    let tokenValid = false;
    if (hasToken) {
      try {
        const decoded = JSON.parse(Buffer.from(process.env.UPLOADTHING_TOKEN!, 'base64').toString());
        tokenValid = !!(decoded.apiKey && decoded.appId && decoded.regions);
      } catch {
        tokenValid = false;
      }
    }
    
    setStatus(`Environment check: Secret=${hasSecret}, Token=${hasToken} (valid=${tokenValid}), AppId=${hasAppId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">UploadThing Test</h1>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Configuration Test</h2>
            
            <div className="space-y-4">
              <button
                onClick={checkEnvVars}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Check Environment Variables
              </button>
              
              <button
                onClick={testUploadThingConfig}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
              >
                Test UploadThing API
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <strong>Status:</strong> {status}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Configuration</h3>
            <div className="space-y-2 text-blue-700 text-sm">
              <div>• UPLOADTHING_SECRET: {process.env.UPLOADTHING_SECRET ? '✅ Set' : '❌ Not set'}</div>
              <div>• UPLOADTHING_TOKEN: {process.env.UPLOADTHING_TOKEN ? '✅ Set' : '❌ Not set'}</div>
              <div>• UPLOADTHING_APP_ID: {process.env.UPLOADTHING_APP_ID ? '✅ Set' : '❌ Not set'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}