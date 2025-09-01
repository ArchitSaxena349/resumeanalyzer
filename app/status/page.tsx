import { config } from "@/lib/config";

export default function StatusPage() {
  const uploadthingConfigured = config.uploadthing.isConfigured();
  const openaiConfigured = config.openai.isConfigured();
  const geminiConfigured = config.gemini.isConfigured();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Status</h1>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Service Configuration</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>UploadThing (File Upload)</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  uploadthingConfigured 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {uploadthingConfigured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>OpenAI (GPT Analysis)</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  openaiConfigured 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {openaiConfigured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Google Gemini (AI Analysis)</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  geminiConfigured 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {geminiConfigured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Clerk Authentication</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Configured
                </span>
              </div>
            </div>
          </div>
          
          {(!uploadthingConfigured || !openaiConfigured || !geminiConfigured) && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Configuration Required</h3>
              <p className="text-yellow-700 mb-4">
                Some services are not configured. Please add the following environment variables to your .env file:
              </p>
              <div className="space-y-2 text-sm font-mono bg-yellow-100 p-4 rounded">
                {!uploadthingConfigured && (
                  <>
                    <div>UPLOADTHING_SECRET=your_uploadthing_secret_here</div>
                    <div>UPLOADTHING_APP_ID=your_uploadthing_app_id_here</div>
                  </>
                )}
                {!openaiConfigured && (
                  <div>OPENAI_API_KEY=your_openai_api_key_here</div>
                )}
                {!geminiConfigured && (
                  <div>GEMINI_API_KEY=your_gemini_api_key_here</div>
                )}
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Getting API Keys</h3>
            <div className="space-y-2 text-blue-700">
              <div>• <strong>UploadThing:</strong> Sign up at <a href="https://uploadthing.com" className="underline" target="_blank" rel="noopener noreferrer">uploadthing.com</a></div>
              <div>• <strong>OpenAI:</strong> Get your API key at <a href="https://platform.openai.com" className="underline" target="_blank" rel="noopener noreferrer">platform.openai.com</a></div>
              <div>• <strong>Google Gemini:</strong> Get your API key at <a href="https://ai.google.dev" className="underline" target="_blank" rel="noopener noreferrer">ai.google.dev</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}