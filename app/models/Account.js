const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    mobile: String,
    careOf: {
      type: String,
      enum: ["S/O", "W/O", "D/O"],
    },
    careOfName: String,
    address: Object,
    profilePic: Object,
    type: {
      type: String,
      enum: ["kisan", "staff", "others"],
    },
    amad: {
      type: Schema.Types.ObjectId,
      ref: "Amad",
      index: true,
    },
    bankAccount: [
      {
        type: Schema.Types.ObjectId,
        ref: "BankAccount",
        index: true,
      },
    ],
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const AccountObj = mongoose.model('Account', AccountSchema);
module.exports = AccountObj;
