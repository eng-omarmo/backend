const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if mandatory fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', newUser });
});

// Get current user information
const currentUser = asyncHandler(async (req, res) => {
    // Extract user information from the decoded token
    const { userId, email, username } = req.decoded;

    res.status(200).json({ userId, email, username });
});

// Login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return error
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        // If passwords don't match, return error
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.Secrettoken, { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ message: 'Successfully logged in', token });
});

module.exports = {
    register,
    currentUser,
    login
};
