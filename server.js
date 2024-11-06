require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://ehasselgren.github.io', 'http://localhost:3000'],
    credentials: true
}));

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

// Routes
app.use('/api', routes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 10000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
