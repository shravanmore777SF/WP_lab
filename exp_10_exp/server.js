const express = require('express');
const app = express();
const PORT = 3000;

// Step 7: Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});

// Step 5: "Hello World" Route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Step 6: JSON API Route
app.get('/api/message', (req, res) => {
    res.json({ 
        message: "Hello from the API", 
        status: "Success" 
    });
});

// Phase 5: 404 Handler
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
