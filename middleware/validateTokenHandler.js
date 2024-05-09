const jwt = require('jsonwebtoken');
const User= require('../models/usersModel');

const auth = (req, res, next) => {
    const headers = req.headers.authorization;
    if(!headers) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token= headers.split(' ')[1];
    if(!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.Secrettoken, (err, decoded) => {
        if(err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const user = User.findOne({ _id: decoded.userId });
        if(!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        console.log(req.user)
        next();
    });
}

module.exports = auth