const express = require('express');
const router = express.Router();
const validateToken =require('../middleware/validateTokenHandler');
const { login, currentUser, register } = require('../controllers/userController');


router.post('/register', register);

router.post('/login', login);

router.get('/current', validateToken, currentUser);

module.exports = router;
