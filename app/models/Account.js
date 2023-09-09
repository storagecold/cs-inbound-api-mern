const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', index: true },
  type: {
    type: String,
    enum: ["kisan", "staff", "others"],
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  firstName: String,
  lastName: String,
  careOf: {
    type: String,
    enum: ["S/O", "W/O", "D/O"],
  },
  careOfName: String,
  address: {
    addressLine1:String,
    addressLine2:String,
    village: String,
    tehsil: String,
    distict: String,
    state: String,
    pinCode: Number
  },
  mobile: String,
  adharNo: Number,
  panNO: String,
  email: String,
  bankDetails: [{
    accNumber: Number,
    accName: String,
    bankName: String,
    branchName: String,
    ifscCode: String,
  }],
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
},
  { timestamps: true }
);

const AccountObj = mongoose.model('Account', AccountSchema);
module.exports = AccountObj;
