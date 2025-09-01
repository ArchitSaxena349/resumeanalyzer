export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-bold mb-4">Basic</h2>
            <div className="text-4xl font-bold mb-4">Free</div>
            <ul className="text-left space-y-2 mb-8">
              <li>✓ 3 resume analyses per month</li>
              <li>✓ Basic ATS scoring</li>
              <li>✓ AI-powered feedback</li>
              <li>✓ Keyword analysis</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-500">
            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <div className="text-4xl font-bold mb-4">$9.99<span className="text-lg">/month</span></div>
            <ul className="text-left space-y-2 mb-8">
              <li>✓ Unlimited resume analyses</li>
              <li>✓ Advanced ATS scoring</li>
              <li>✓ Dual AI analysis (OpenAI + Gemini)</li>
              <li>✓ Detailed keyword analysis</li>
              <li>✓ Priority support</li>
              <li>✓ Export reports</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}