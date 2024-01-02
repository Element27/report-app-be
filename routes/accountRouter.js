const express = require('express');

const { openAccount, closeAccount, currentAccount, getAllAccount } = require('../controller/accountController');
const validateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.use(validateToken);

router.get('/', getAllAccount);
router.get('/open', openAccount);
router.get('/current', currentAccount);
router.get('/close', closeAccount);

module.exports = router;