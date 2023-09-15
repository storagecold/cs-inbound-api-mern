const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', index: true },
 
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    index: true
  },
  voucherNo: {
    type: Number,
    unique: true,
    index: true
  },
  creditAmount: {
    type: Number,
  },
  debtAmount: {
    type: Number,
  },


  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
},
  { timestamps: true }
);

const AccountObj = mongoose.model('Account', AccountSchema);
module.exports = AccountObj;
