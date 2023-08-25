const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  bankAccNumber: String,
  accountHolderName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

const BankAccountObj = mongoose.model('BankAccount', BankAccountSchema);
module.exports = BankAccountObj;
