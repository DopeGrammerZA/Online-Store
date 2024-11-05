const admin = require('../config/firebase');

const firebaseAuth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = firebaseAuth;
