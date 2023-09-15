const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const receiptSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', index: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', index: true },
  voucherNo: { type: Number, unique: true, index: true },
  creditAmount: Number,
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const ReceiptObj = model('Receipt', receiptSchema);

module.exports = ReceiptObj;
