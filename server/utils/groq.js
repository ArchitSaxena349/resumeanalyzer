const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeResume(resumeText) {
    try {
        // key: "value",
        const prompt = `Analyze the resume text below. First, identify the candidate's primary job role (e.g., "Frontend Developer", "Marketing Manager"). Then, provide a strict JSON analysis based on that role.

        Resume Text:
        ${resumeText}

        Output Structure (JSON):
        {
            "candidate_role": "The inferred role",
            "skills": ["List", "of", "technical", "skills", "found"],
            "missingKeywords": ["List", "of", "standard", "industry", "keywords", "missing", "for", "this", "specific", "role"],
            "suggestions": ["List", "of", "3-5", "critical", "improvements"],
            "experience_summary": "One sentence summary of experience",
            "education": "One sentence summary of education",
            "strengths": ["List", "of", "3", "strong", "points"],
        }
        
        Rules:
        1. Output MUST be valid JSON.
        2. Do not include markdown formatting (like \`\`\`json).
        3. Be concise.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume consultant. Respond strictly with raw JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.1-8b-instant", // optimized for speed
            temperature: 0, // Maximum determinism
            response_format: { type: "json_object" }
        });

        const content = chatCompletion.choices[0]?.message?.content || "";
        return content.trim();

    } catch (error) {
        console.error("Error analyzing resume with Groq:", error);
        throw error;
    }
}

module.exports = { analyzeResume };
