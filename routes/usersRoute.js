const express = require('express');
const { getAllUsers, addUser, getUser, updateUser, deleteUser } = require('../controller/usersController');
const validateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(validateToken);
// TODO: only admins can access this routes
router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;
