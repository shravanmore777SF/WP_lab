const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow frontend requests

const startServer = async () => {
    // Database Connection (Self-contained for Experiment 11)
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri)
        .then(() => console.log("Connected to MongoDB successfully (In-Memory)"))
        .catch(err => console.error("Could not connect to MongoDB", err));

    // Create User Schema
    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, min: 18 }
    });

    // Create Model
    const User = mongoose.model('User', userSchema);

    // Create User (POST)
    app.post('/api/users', async (req, res) => {
        try {
            const user = new User(req.body); // Accept user data
            await user.save(); // Save to database
            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Retrieve All Users (GET)
    app.get('/api/users', async (req, res) => {
        const users = await User.find(); // Fetch all users from DB
        res.json(users); // Send JSON response
    });

    // Start Server
    app.listen(3000, () => console.log("Server running on port 3000"));
};

startServer();
