const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  village: String,
});

const tehsilSchema = new mongoose.Schema({
  tehsil: String,
  villages: [villageSchema],
});

const districtSchema = new mongoose.Schema({
  district: String,
  tehsils: [tehsilSchema],
});

const stateSchema = new mongoose.Schema({
  state: String,
  districts: [districtSchema],
});

const addressSchema = new mongoose.Schema({
  states: [stateSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
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