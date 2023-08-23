const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, index: true },
  role: {
    type: String,
    enum: ['admin', 'manager', 'member']
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    index: true
  },

  mobile: String,
  password: String,
  firstName: String,
  lastName: String,
  address: {
    addressLine1:String,
    addressLine2:String,
    city:String,
    district:String,
    state:String,
    zipcode:Number,
  },
  profilePic: Object,
  employeeCode: String,
  gender: String,
  lastLogin: Object,

  isDeleted: { type: Boolean, default: false },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

const UserObj = mongoose.model('User', UserSchema);
module.exports = UserObj;
