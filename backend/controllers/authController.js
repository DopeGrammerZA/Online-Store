const admin = require('firebase-admin');
const db = require('../firebase.js');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username,
        });
        await db.collection('users').doc(userRecord.uid).set({
            username,
            email,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ message: 'User registered successfully', user: userRecord });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;     
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        res.json({
            message: 'Login successful',
            user: { uid: userRecord.uid, username: userRecord.displayName, email: userRecord.email },
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
