const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.Secrettoken, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authorized" });
            } else {
                // Token is valid, set the decoded payload in the request object
                req.decoded = decoded;
                next(); // Move to the next middleware
            }
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
});

module.exports = validateToken;
