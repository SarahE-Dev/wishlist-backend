const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

const User = require('../models/User');

userRouter.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ message: 'Please provide a username and password' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword});
        await user.save();
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET,                 
            { expiresIn: '24h' } 
        );
        res.status(201).json({ message: 'User created successfully' , token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ message: 'Please provide a username and password' });
        }
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
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
    