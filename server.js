
const express = require('express');
const app = express();
const PORT = 3000;

// Logging Middleware
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

// Bearer Token Authentication Middleware (for protected routes)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || token !== 'mysecrettoken') {
        return res.status(401).json({
            message: "Authorization header missing or incorrect"
        });
    }
    next();
}

// Public Route
app.get('/public', (req, res) => {
    res.status(200).send('This is a public route. No authentication required.');
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send('You have accessed a protected route with a valid Bearer token.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
