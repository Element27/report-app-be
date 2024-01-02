const asyncHandler = require('express-async-handler');

const Transaction = require('../model/transactionModel');

// TODO: add company id as transaction is being created
// TODO: add account id as transaction is being created
// TODO: add User id as transaction is being created
// TODO: add User id as transaction is being created

// @description: get all transactions
// @route GET /api/transactions
// @access public

const getTransactions = asyncHandler(async (req, res) => {

  const data = await Transaction.find({});

  res.json({ message: "successful", data, meta_data: { count: data.length } });
})


// @description: add new transaction
// @route POST /api/transactions
// @access public

const addTransaction = asyncHandler(async (req, res) => {
  // console.log(req.body);

  if (!req.body || req.body === undefined) {
    res.status(400)
    throw new Error('Invalid request')
  }

  const { transaction_type, amount, creditor, debitor, discount } = req.body;

  if (!transaction_type) {
    res.status(400);
    throw new Error('transaction type is required');
  }
  if (!amount) {
    res.status(400);
    throw new Error('amount is required');
  }

  if (creditor && !creditor.name) {
    res.status(400);
    throw new Error('creditor name is required');
  }

  if (creditor && !creditor.amount) {
    res.status(400);
    throw new Error('creditor amount is required');
  }

  if (debitor && !debitor.name) {
    res.status(400);
    throw new Error('debitor name is required');
  }

  if (debitor && !debitor.amount) {
    res.status(400);
    throw new Error('debitor amount is required');
  }

  const transaction = await Transaction.create({ transaction_type, amount, creditor, debitor, discount });

  res.status(200).json({ message: "successful", data: transaction });

})


// @description: fetch single transaction by id
// @route GET /api/transaction/id
// @access public

const getTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Transaction.findOne({ _id: id });

  if (!data) {
    res.status(400);
    throw new Error('transaction not found');
  }

  res.json({ message: "successful", data });
})


// @description: update a transaction
// @route PUT /api/transaction/id
// @access public

const updateTransaction = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const data = Transaction.findOne({ _id: id });

  if (!data) {
    res.status(400);
    throw new Error('transaction not found');
  }

  const updatedData = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

  res.json({ message: "update successful", data: updatedData });
})


// @description: delete a transaction
// @route DELETE /api/transactions
// @access public

const deleteTransaction = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const data = await Transaction.findOne({ _id: id });

  if (!data) {
    res.json(400);
    throw new Error('transaction not found');
  }

  await Transaction.findByIdAndDelete({ _id: id });
  res.status(200).json({ message: "delete successful" });

})


module.exports = {
  getTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
}
