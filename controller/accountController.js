// @description: handles all account related requests
const asyncHandler = require('express-async-handler');
const Account = require('../model/accountModel');

// @description: open a new account for transaction
// @route POST /api/account
// @access private

const openAccount = asyncHandler(async (req, res) => {


  //checking if there is any account still open...
  const open = await Account.find({ company_id: req.user.company_id, isOpen: true });

  // if there is an open account, close it
  // close all open accounts
  if (open.length > 0) {
    for (let i = 0; i < open.length; i++) {
      open[i].isOpen = false;
      open[i].closingBalance = open[i].openingBalance + open[i].currentBalance;
      open[i].currentBalance = 0; //is all the money that came in that day
      await open[i].save();
    }
  }

  // get the most recently closed account
  // const last = await Account.find({ isOpen: false }).sort({ date: -1 }).limit(1);
  const last = await Account.find({ company_id: req.user.company_id }).sort({ date: -1 }).limit(1);

  // console.log(last);

  const data = {
    openingBalance: last.length > 0 ? last[0].closingBalance : 0,
    // -    date: new Date().setHours(0, 0, 0, 0),
    date: new Date().toISOString().split('T')[0],
    company_id: req.user.company_id,
    opener_id: req.user.id,
    isOpen: true,
    closingBalance: 0,
    currentBalance: 0
  }

  console.log(data)

  const newAccount = await Account.create(data);

  res.json({ message: "account created", data: newAccount });
});



// @description: closes opened account for transaction
// @route PUT /api/account/close
// @access private

const closeAccount = asyncHandler(async (req, res) => {

  // const open = await Account.findById(req.params.id);
  const open = await Account.find({ company_id: req.user.company_id, isOpen: true });
  console.log(open[0].company_id.toString())
  console.log(req.user.company_id)
  if (!open) {
    res.status(400);
    throw new Error('no open account');
  }
  if (open.isOpen === false) {
    res.status(400);
    throw new Error('no open account');
  }

  // if (open.opener_id !== req.user._id) {
  //   res.status(400);
  //   throw new Error('Unauthorised');
  // }

  if (open[0].company_id.toString() !== req.user.company_id) {
    res.status(400);
    throw new Error('Unauthorised');
  }

  // const close = await Account.findByIdAndUpdate(req.params.id, { isOpen: false, closingBalance: open.currentBalance });
  const close = await Account.findByIdAndUpdate(open._id, { isOpen: false, closingBalance: open.currentBalance, closer_id: req.user._id });

  res.json({ message: "account closed successfully", data: close });
});


// @description: get the currently open account
// @route GET /api/account
// @access private

const currentAccount = asyncHandler(async (req, res) => {
  // the currently opend account endpoint will be called everytime a transaction is to be added so that the transaction id can be added to the transaction.

  const account = await Account.find({ company_id: req.user.company_id, isOpen: true });

  if (account) {
    res.json({ message: "successful", data: account });
  }
  else {
    res.json({ message: "no open account" });
  }

});
const getAllAccount = asyncHandler(async (req, res) => {
  // the currently opend account endpoint will be called everytime a transaction is to be added so that the transaction id can be added to the transaction.
  const account = await Account.find({ company_id: req.user.company_id });

  res.json({ message: "successful", data: account, meta_data: { count: account.length } });

});

module.exports = {
  openAccount,
  closeAccount,
  currentAccount,
  getAllAccount,
}