const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.status(200).json({ message: 'create new user' });
});

router.post('/login', (req, res) => {
    res.status(200).json({ message: 'successfully login' });
});

router.get('/current', (req, res) => {
    res.status(200).json({ message: 'current user info' });
});

module.exports = router;
