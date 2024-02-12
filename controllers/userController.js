const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');

// **Register**:
// - **Method:** POST
// - **Description:** Registers a new user.
// - **Request Body:** Requires `username`, `email`, and `password` fields.
// - **Response:** 
//   - If the user is successfully registered, it returns a JSON object representing the new user with a status code of 201.
//   - If any of the mandatory fields (username, email, password) are missing, it returns a JSON object with an error message and a status code of 400.
//   - If the email is already taken, it returns a JSON object with an error message and a status code of 400.
//   - If a user with the provided user ID exists, it returns a JSON object with an error message and a status code of 400.
//   - If there's an internal server error during the registration process, it returns a JSON object with an error message and a status code of 500.

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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });
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
