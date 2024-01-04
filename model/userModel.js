const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: function () { return this.role !== 'super-admin'; } }, // company id is only required when the user being created is not the super admin. ie, company id is not required for the first person to register.
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: [true, "email already exists"] },
  password: { type: String, required: [true, 'Password is required'] },
  role: { type: String, required: [true, 'Role is required'] },
  isActive: { type: Boolean, default: true, required: [true, 'isActive is required'] },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);