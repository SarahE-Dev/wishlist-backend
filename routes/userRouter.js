const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const userRouter = express.Router(); 

const User = require('../models/User'); 

// User signup route with validation and JWT generation
userRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password presence
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password' });
    }

    // Hash password for secure storage
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ message: 'User created successfully', token }); // 201 status for new User
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login route with authentication and JWT generation
userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password presence
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password hash with provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;