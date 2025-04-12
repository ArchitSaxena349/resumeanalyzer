import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeResume(resumeText: string) {
  try {
    const prompt = `Analyze the following resume and provide a detailed analysis:
    
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

    const response = await ai.models.generateContent({
      model: "gemini-pro",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
}

// Example usage
async function main() {
  const sampleResume = `
    John Doe
    Software Engineer
    Experience:
    - Senior Developer at Tech Corp (2020-Present)
    - Junior Developer at Startup Inc (2018-2020)
    Education:
    - B.S. Computer Science, University of Tech (2018)
    Skills:
    - JavaScript, React, Node.js
    - Python, Machine Learning
    - AWS, Docker
  `;

  try {
    const analysis = await analyzeResume(sampleResume);
    console.log("Resume Analysis:", analysis);
  } catch (error) {
    console.error("Failed to analyze resume:", error);
  }
}

// Uncomment to test
// main();