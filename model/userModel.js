const mongoose = require('mongoose');
// TODO add company id
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: [true, "email already exists"] },
  password: { type: String, required: [true, 'Password is required'] },
  role: { type: String, required: [true, 'Role is required'] },
  isActive: { type: Boolean, default: true, required: [true, 'isActive is required'] },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);