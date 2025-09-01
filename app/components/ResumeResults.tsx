'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface ResumeAnalysis {
  atsScore: number;
  geminiAnalysis: string;
  openaiAnalysis: string;
  suggestions: string[];
  keywords: string[];
  missingKeywords: string[];
}

export default function ResumeResults() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const fileKey = searchParams.get('key');

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!fileKey) {
        setError('No file key provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/analyze-resume?key=${fileKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [fileKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-lg">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">No analysis data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Resume Analysis Results</h1>
        <p className="text-gray-600 mt-2">Detailed analysis of your resume</p>
      </div>

      <div className="space-y-8">
        {/* ATS Score Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">ATS Score</h2>
          <div className="flex items-center">
            <div className="text-4xl font-bold text-rose-600">
              {analysis.atsScore}/100
            </div>
            <div className="ml-4 flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-rose-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.atsScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {analysis.atsScore >= 80 ? 'Excellent ATS compatibility' :
                 analysis.atsScore >= 60 ? 'Good ATS compatibility' :
                 'Needs improvement for better ATS compatibility'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Gemini Analysis</h2>
            <div className="whitespace-pre-line bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
              {analysis.geminiAnalysis}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">OpenAI Analysis</h2>
            <div className="whitespace-pre-line bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
              {typeof analysis.openaiAnalysis === 'string' 
                ? analysis.openaiAnalysis 
                : JSON.stringify(analysis.openaiAnalysis, null, 2)}
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Keyword Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Present Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Improvement Suggestions</h2>
          <ul className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">•</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 