// @routes to manage transactions in the system
const express = require('express');

const {
  getTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controller/transactionsController');



const router = express.Router();

// TODO:add middlewares for authentication and checking user role

router.get('/', getTransactions);

router.post('/', addTransaction);

router.get('/:id', getTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

module.exports = router;

