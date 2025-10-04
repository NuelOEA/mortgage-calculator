const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware - these run before our routes
app.use(helmet()); // Security headers
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port for frontend
    credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

// Rate limiting - prevents spam/abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Test route to check if server is working
app.get('/', (req, res) => {
    res.json({ message: 'Lloyds Mortgage Calculator API is running!' });
});

// Routes will go here
app.use('/api/calculator', require('./src/routes/calculator.routes'));

// Error handler - catches any errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: {
            message: err.message || 'Internal server error'
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});