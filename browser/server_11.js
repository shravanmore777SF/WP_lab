const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(express.json());

const startServer = async () => {
  // Phase 2 & 3: Database Setup (Using MongoMemoryServer for reliable demo)
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Task 3: Connection
  await mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB (In-Memory)..."))
    .catch(err => console.error("Connection failed", err));

  // Task 4: Schema & Model
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, min: 18 } // Task 9: Validation
  });

  const User = mongoose.model('User', userSchema);

  // Task 5 & 8: REST API Routes
  // GET all users
  app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

  // POST new user
  app.post('/api/users', async (req, res) => {
    try {
      let user = new User(req.body);
      user = await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err.message); // Task 10: Error Handling
    }
  });

  // PUT (Update)
  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).send("User not found");
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  // DELETE
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send("User not found");
      res.send({ message: "User deleted successfully", user });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

startServer();
