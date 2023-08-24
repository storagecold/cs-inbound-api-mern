const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
  accountNumber: String,
  accountHolderName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
}, { timestamps: true });

const BankAccountObj = mongoose.model('BankAccount', BankAccountSchema);
module.exports = BankAccountObj;
