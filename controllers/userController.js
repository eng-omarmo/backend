const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const UserId = req.params.id;

    // Check if mandatory fields are present
    if (!username || !email || !password) {
        throw new Error('All fields are mandatory');
    }

    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
    }

    // Check if user with provided UserId exists
    const existingRecord = await User.findById(UserId);
    if (existingRecord) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully', newUser });
});

// Get current user information
const currentUser = asyncHandler(async (req, res) => {
    res.status(200);
    throw new Error();
});

// Login user
const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'successfully login' });
});

module.exports = {
    register, currentUser, login
};
