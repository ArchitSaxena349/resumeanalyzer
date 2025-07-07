import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { PDFDocument } from "pdf-lib";
import { readFile, unlink } from "fs/promises";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ResumeAnalysis {
  atsScore: number;
  geminiAnalysis: string;
  openaiAnalysis: string;
  suggestions: string[];
  keywords: string[];
  missingKeywords: string[];
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    let text = "";
    
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
      const content = await page.getText();
      text += content + "\n";
    }
    
    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
}

export async function analyzeResumeWithAI(resumeText: string): Promise<ResumeAnalysis> {
  try {
    // Gemini Analysis
    const geminiPrompt = `Analyze the following resume and provide a detailed analysis:
    
    ${resumeText}
    
    Please provide analysis in the following format:
    1. Key Skills Identified
    2. Work Experience Summary
    3. Education Background
    4. Strengths
    5. Areas for Improvement
    6. Overall Assessment
    7. Suggestions for Enhancement
    
    Be specific and provide actionable feedback.`;

    const geminiResponse = await gemini.models.generateContent({
      model: "gemini-pro",
      contents: geminiPrompt,
    });

    // OpenAI Analysis
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer and career coach. Analyze the resume and provide detailed feedback."
        },
        {
          role: "user",
          content: `Analyze this resume and provide detailed feedback: ${resumeText}`
        }
      ],
    });

    // ATS Scoring
    const atsPrompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility:
    
    ${resumeText}
    
    Provide:
    1. ATS Score (0-100)
    2. Missing Keywords
    3. Formatting Issues
    4. Optimization Suggestions`;

    const atsResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in ATS systems and resume optimization."
        },
        {
          role: "user",
          content: atsPrompt
        }
      ],
    });

    const atsContent = atsResponse.choices[0]?.message?.content || '';
    const geminiContent = geminiResponse.text || '';
    const openaiContent = openaiResponse.choices[0]?.message?.content || '';

    // Extract ATS score and other information
    const atsScore = extractATSScore(atsContent);
    const keywords = extractKeywords(atsContent);
    const missingKeywords = extractMissingKeywords(atsContent);
    const suggestions = extractSuggestions(atsContent);

    return {
      atsScore,
      geminiAnalysis: geminiContent,
      openaiAnalysis: openaiContent,
      suggestions,
      keywords,
      missingKeywords
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
}

function extractATSScore(text: string): number {
  const scoreMatch = text.match(/ATS Score:?\s*(\d+)/i);
  return scoreMatch ? parseInt(scoreMatch[1]) : 0;
}

function extractKeywords(text: string): string[] {
  const keywordMatch = text.match(/Keywords:?\s*([\w\s,]+)/i);
  return keywordMatch ? keywordMatch[1].split(',').map(k => k.trim()) : [];
}

function extractMissingKeywords(text: string): string[] {
  const missingMatch = text.match(/Missing Keywords:?\s*([\w\s,]+)/i);
  return missingMatch ? missingMatch[1].split(',').map(k => k.trim()) : [];
}

function extractSuggestions(text: string): string[] {
  const suggestionsMatch = text.match(/Suggestions:?\s*([\w\s,.]+)/i);
  return suggestionsMatch ? suggestionsMatch[1].split('.').map(s => s.trim()) : [];
}

// Example usage
export async function processResumePDF(pdfPath: string): Promise<ResumeAnalysis> {
  try {
    const pdfBuffer = await readFile(pdfPath);
    const resumeText = await extractTextFromPDF(pdfBuffer);
    return await analyzeResumeWithAI(resumeText);
  } catch (error) {
    console.error("Error processing resume PDF:", error);
    throw error;
  }
} 