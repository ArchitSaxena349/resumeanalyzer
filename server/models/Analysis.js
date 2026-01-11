const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    atsScore: { type: Number, required: true },
    keywords: [String],
    missingKeywords: [String],
    suggestions: [String],
    aiAnalysis: { type: String }, // Raw JSON or text

});

module.exports = mongoose.model('Analysis', AnalysisSchema);
