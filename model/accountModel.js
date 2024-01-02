const mongoose = require('mongoose');
// TODO add company id
// TODO add user id
const accountSchema = new mongoose.Schema({
  openingBalance: { type: Number }, //total balance from previous transactions
  // date: { type: Date, default: () => new Date(new Date().setHours(0, 0, 0, 0)) },
  date: { type: Date, default: () => new Date(new Date().toISOString().split('T')[0]) },
  // name: { type: String, required: [true, 'name is required'] },
  isOpen: { type: Boolean, default: true },
  closingBalance: { type: Number }, //opening balance + current balance
  currentBalance: { type: Number } //total amount made that day
}, {
  timestamps: true
})

module.exports = mongoose.model('Account', accountSchema);