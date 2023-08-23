const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
  accountNumber: String,
  accountName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
}, { timestamps: true });

const BankAccountObj = mongoose.model('BankAccount', BankAccountSchema);
module.exports = BankAccountObj;
