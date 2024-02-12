const asyncHandler = require('express-async-handler');


const register = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'create new user' });
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'current user info' });

});
const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'successfully login' });
});

module.exports = {
    register, currentUser, login
}