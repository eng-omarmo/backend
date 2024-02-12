const express = require('express');
const router = express.Router();

router.get('/register');

router.post('/login');

router.get('/current');

module.exports = router;
