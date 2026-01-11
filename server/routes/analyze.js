const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const { extractTextFromBuffer } = require('../utils/pdf');
const { analyzeResume: analyzeGroq } = require('../utils/groq');
const multer = require('multer');

// Configure Multer (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Remove fetchPdfBuffer as we get buffer directly from upload

function calculateATSScore(pdfText, keywords) {
    let score = 70; // Base score
    const text = pdfText.toLowerCase();

    // Format checks
    if (text.includes('experience') || text.includes('work history')) score += 5;
    if (text.includes('education') || text.includes('degree')) score += 5;
    if (text.includes('skills') || text.includes('technologies')) score += 5;
    if (text.includes('contact') || text.includes('email') || text.includes('phone')) score += 5;

    // Content quality checks
    if (text.length > 500) score += 5;
    if (keywords && keywords.length > 5) score += 5;

    // Professional formatting
    if (!text.includes('graphic') && !text.includes('image') && !text.includes('color')) score += 5;

    return Math.min(score, 100);
}

const fs = require('fs');
const path = require('path');

function logDebug(message, data = {}) {
    const logLine = `[${new Date().toISOString()}] ${message} ${JSON.stringify(data)}\n`;
    fs.appendFileSync(path.join(__dirname, '../server_debug.txt'), logLine);
    console.log(message, data);
}

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        logDebug("Request received at /api/analyze");

        // Debug Auth
        if (!req.auth) {
            logDebug("CRITICAL: req.auth is missing");
        } else {
            logDebug("Auth context", req.auth);
        }

        if (!req.file) {
            logDebug("Error: No file uploaded");
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { userId } = req.auth || {};
        const buffer = req.file.buffer;
        const fileName = req.file.originalname;

        logDebug("File received", { size: buffer.length, fileName, userId });

        // 1. Extract Text
        logDebug("Extracting text...");
        const pdfText = await extractTextFromBuffer(buffer);
        logDebug("Text extracted", { length: pdfText.length, preview: pdfText.substring(0, 50) });

        // 2. AI Analysis
        logDebug("Sending to Groq...");
        const groqResultRaw = await analyzeGroq(pdfText);
        logDebug("Groq response received", { rawLength: groqResultRaw.length });

        // 3. Parse Results
        let analysisData = {};
        try {
            analysisData = JSON.parse(groqResultRaw);
        } catch (e) {
            logDebug("Groq JSON parse failed", { error: e.message });
            analysisData = { suggestions: ["Could not parse AI response"] };
        }

        const keywords = analysisData.skills || [];
        const suggestions = analysisData.suggestions || analysisData.recommendations || [];
        const atsScore = calculateATSScore(pdfText, keywords);

        // 4. Save to Database
        const newAnalysis = new Analysis({
            userId: 'anonymous',
            fileName: req.file.originalname,
            fileUrl: 'local', // Placeholder or omitted
            atsScore,
            keywords,
            missingKeywords: analysisData.missingKeywords || [],
            suggestions,
            aiAnalysis: groqResultRaw
        });

        await newAnalysis.save();
        logDebug("Analysis saved to DB", { id: newAnalysis._id });

        res.json({
            success: true,
            analysisId: newAnalysis._id,
            atsScore,
            keywords,
            suggestions,
            analysis: analysisData
        });

    } catch (error) {
        logDebug("CRITICAL ANALYSIS ERROR", { message: error.message, stack: error.stack });
        console.error('Analysis Error:', error);
        res.status(500).json({
            error: 'Failed to process resume',
            details: error.message
        });
    }
});

module.exports = router;
