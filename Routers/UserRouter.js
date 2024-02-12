const express = require('express');
const router = express.Router();

const { login, currentUser, register } = require('../controllers/userController');


router.get('/register', register);

router.post('/login', login);

router.get('/current', currentUser);

module.exports = router;
