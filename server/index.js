const express = require('express');
const mongoose = require('mongoose');
const CustomerModel = require('./models/Customer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Register a new user
app.post("/register", (req, res) => {
  console.log('Received request:', req.body);  // Log the request body for debugging

  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  CustomerModel.create({ firstName, lastName, email, username, password })
    .then(customer => res.json(customer))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Login a user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  CustomerModel.findOne({ username })
    .then(customer => {
      if (!customer) {
        return res.status(404).json({ error: "User not found" });
      }

      if (password !== customer.password) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      res.json({ message: "Login successful", user: customer });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update user information
app.put('/updateUser', (req, res) => {
  const { firstName, lastName, email, username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  CustomerModel.findOneAndUpdate(
    { username },
    { firstName, lastName, email },
    { new: true }
  )
  .then(customer => {
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: 'User updated successfully', user: customer });
  })
  .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a user
app.delete('/deleteUser', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  CustomerModel.findOneAndDelete({ username })
    .then(customer => {
      if (!customer) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5173, () => {
  console.log('Server running on port 5173');
});
