'use server'

import { fetchAndExtractText } from "@/lib/langchain";
import { analyzeResume } from "@/lib/openai";

export async function analyzeResumeAction(uploadResponse: {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}) {
    if(!uploadResponse){
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        };
    }

    const { serverData: { userId, file: { url: pdfUrl, name: fileName } } } = uploadResponse;

    if(!pdfUrl) {
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractText(pdfUrl);
        console.log({pdfText});
        const analysis = await analyzeResume(pdfText);
        console.log({analysis});
        
        if(!analysis) {
            return {
                success: false,
                message: 'Resume analysis failed',
                data: null,
            };
        }

        return {
            success: true,
            message: 'Resume analyzed successfully',
            data: analysis,
        };
    } catch(error) {
        return {
            success: false,
            message: 'Error analyzing resume',
            data: null,
        };
    }
}
