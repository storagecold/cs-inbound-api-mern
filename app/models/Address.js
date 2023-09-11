const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  village: String,
  tehsil: String,
  district: String,
  state: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const AddressObj = mongoose.model('Address', addressSchema);

module.exports = AddressObj;
