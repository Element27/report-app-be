const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: false },
  name: { type: String, required: [true, "name is required"] },
  description: { type: String, required: false }
},
  { timestamps: true });

module.exports = mongoose.model("Company", companySchema);