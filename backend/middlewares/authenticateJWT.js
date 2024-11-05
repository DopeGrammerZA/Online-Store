const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ThisIsMyPassword'; 

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.sendStatus(403); 
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
