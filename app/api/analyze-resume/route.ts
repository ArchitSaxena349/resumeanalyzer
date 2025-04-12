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
    const docs = await fetchAndExtractText(fileUrl);
    const pdfText = docs.map(doc => doc.pageContent).join('\n');

    // Get analysis from both OpenAI and Gemini
    const [openaiAnalysis, geminiAnalysis] = await Promise.all([
      analyzeResume(pdfText),
      analyzeResumeGemini(pdfText)
    ]);

    // Calculate ATS score and get suggestions
    const atsScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100 for demo
    const keywords = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'];
    const missingKeywords = ['TypeScript', 'Docker', 'CI/CD'];
    const suggestions = [
      'Add more specific achievements to your work experience',
      'Include relevant certifications',
      'Highlight leadership experience',
      'Add more technical skills'
    ];

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