// @routes to manage transactions in the system
const validateToken = require('../middleware/authMiddleware');
const express = require('express');

const {
  getTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controller/transactionsController');



const router = express.Router();

router.use(validateToken);

router.get('/', getTransactions);

router.post('/', addTransaction);

router.get('/:id', getTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

module.exports = router;

