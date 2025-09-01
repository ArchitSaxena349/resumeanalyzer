import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
});

export async function generateSummary(pdfText: string) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes PDF content.",
        },
        {
          role: "user",
          content: pdfText,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return response.choices[0].message.content;
  } catch (error: unknown) {
    if (error instanceof OpenAI.APIError && error.status === 429) {
      console.log("Rate limit exceeded, retrying in 1 second...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return generateSummary(pdfText);
    }
    throw error;
  }
}

export async function analyzeResume(pdfText: string) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyzer. Analyze the resume and provide insights in the following format:
          {
            "summary": "Brief summary of the candidate",
            "strengths": ["List of key strengths"],
            "weaknesses": ["List of potential areas for improvement"],
            "skills": ["List of technical and soft skills"],
            "experience": "Years of relevant experience",
            "recommendations": ["List of recommendations for improvement"]
          }`
        },
        {
          role: "user",
          content: pdfText,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error: unknown) {
    if (error instanceof OpenAI.APIError && error.status === 429) {
      console.log("Rate limit exceeded, retrying in 1 second...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return analyzeResume(pdfText);
    }
    throw error;
  }
}