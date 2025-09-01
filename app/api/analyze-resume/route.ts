import { NextRequest, NextResponse } from 'next/server';
import { fetchAndExtractText } from '@/lib/langchain';
import { analyzeResume } from '@/lib/openai';
import { analyzeResume as analyzeResumeGemini } from '@/lib/gemnai';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileKey = searchParams.get('key');

    if (!fileKey) {
      return NextResponse.json(
        { error: 'No file key provided' },
        { status: 400 }
      );
    }

    // Fetch the file from UploadThing
    const fileUrl = `https://utfs.io/f/${fileKey}`;
    
    // Extract text from PDF
    const pdfText = await fetchAndExtractText(fileUrl);

    // Get analysis from both OpenAI and Gemini
    const [openaiAnalysis, geminiAnalysis] = await Promise.all([
      analyzeResume(pdfText),
      analyzeResumeGemini(pdfText)
    ]);

    // Calculate ATS score based on content analysis
    const atsScore = calculateATSScore(pdfText);
    
    // Extract keywords and suggestions from AI analysis
    const { keywords, missingKeywords, suggestions } = extractKeywordsAndSuggestions(pdfText);

    return NextResponse.json({
      atsScore,
      geminiAnalysis,
      openaiAnalysis,
      suggestions,
      keywords,
      missingKeywords
    });
  } catch (error) {
    console.error('Error processing resume:', error);
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
}

function calculateATSScore(pdfText: string): number {
  let score = 70; // Base score
  
  // Check for common ATS-friendly elements
  const text = pdfText.toLowerCase();
  
  // Format checks
  if (text.includes('experience') || text.includes('work history')) score += 5;
  if (text.includes('education') || text.includes('degree')) score += 5;
  if (text.includes('skills') || text.includes('technologies')) score += 5;
  if (text.includes('contact') || text.includes('email') || text.includes('phone')) score += 5;
  
  // Content quality checks
  if (text.length > 500) score += 5; // Sufficient content
  if (text.includes('javascript') || text.includes('python') || text.includes('react')) score += 5; // Technical skills
  
  // Professional formatting
  if (!text.includes('graphic') && !text.includes('image') && !text.includes('color')) score += 5; // Text-based
  
  // Cap at 100
  return Math.min(score, 100);
}

function extractKeywordsAndSuggestions(pdfText: string) {
  const text = pdfText.toLowerCase();
  
  // Common technical keywords
  const commonKeywords = [
    'javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'kubernetes',
    'typescript', 'java', 'c++', 'sql', 'mongodb', 'postgresql', 'git',
    'agile', 'scrum', 'devops', 'ci/cd', 'microservices', 'api', 'rest'
  ];
  
  const keywords = commonKeywords.filter(keyword => text.includes(keyword));
  const missingKeywords = commonKeywords.filter(keyword => !text.includes(keyword)).slice(0, 5);
  
  const suggestions = [
    'Add more specific achievements with quantifiable results',
    'Include relevant certifications and training',
    'Highlight leadership and project management experience',
    'Add more technical skills and tools',
    'Ensure consistent formatting and professional presentation'
  ];
  
  return { keywords, missingKeywords, suggestions };
} 