const express = require('express');
const { register, login, logout, resetPassword } = require('../controller/authController');

const router = express.Router();


router.post('/register', register)

router.post('/login', login)

// TODO: log out function
router.post('/logout', logout)

// TODO: reset password option
router.post('/forgot-password', resetPassword)

module.exports = router;