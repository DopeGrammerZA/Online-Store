const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authenticateJWT');

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

module.exports = router;
