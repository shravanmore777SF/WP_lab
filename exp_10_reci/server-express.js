const express = require('express');
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => res.send('Welcome Home!'));
app.get('/contact', (req, res) => res.send('Contact us at sfit@example.com'));
app.get('/api/user', (req, res) => {
    res.json({ name: "Alex", age: 20, course: "AIML" });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(3000, () => console.log('Express Server running at http://localhost:3000/'));
