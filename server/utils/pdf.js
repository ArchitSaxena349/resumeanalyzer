const pdf = require('pdf-parse');

async function extractTextFromBuffer(buffer) {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to parse PDF content: ' + error.message);
    }
}

module.exports = { extractTextFromBuffer };
