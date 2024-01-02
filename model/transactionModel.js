const mongoose = require('mongoose');


//TODO: add company id reference
//TODO: add userid reference
//TODO: add account id reference

const transactionSchema = new mongoose.Schema({
  transactionType: { type: String, required: [true, 'transaction type is required'] },
  amount: { type: Number, required: [true, 'transaction amount is required'] },
  creditor: {
    name: { type: String, required: function () { return this.creditor != null; } },
    amount: { type: Number, required: function () { return this.creditor != null; } }
  },
  debitor: {
    name: { type: String, required: function () { return this.creditor != null; } },
    amount: { type: Number, required: function () { return this.creditor != null; } }
  },
  discount: { type: Number, required: false },
  date: { type: Date, default: Date.now },
  // accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);