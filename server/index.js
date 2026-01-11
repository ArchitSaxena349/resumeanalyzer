const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// const uploadRoutes = require('./routes/upload');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes Configuration
app.get('/', (req, res) => {
    res.send('Resume Analyzer API is running...');
});

// Routes
app.use('/api/analyze', analyzeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
