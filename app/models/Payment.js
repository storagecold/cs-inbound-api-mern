const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', index: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', index: true },
  voucherNo: { type: Number, unique: true, index: true },
  debitAmount: {
    type: Number,
    validate: {
      validator: (value) => value >= 0, 
      message: 'Debit amount must not be negative.',
    },
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const PaymentObj = mongoose.model('Payment', paymentSchema); 
module.exports = PaymentObj;
