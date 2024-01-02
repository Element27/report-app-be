const express = require('express');
const { register, login, logout, resetPassword } = require('../controller/authController');

const router = express.Router();


router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/forgot-password', resetPassword)

module.exports = router;