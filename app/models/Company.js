const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    companyCode: {
      type: String,
      unique: true,
      index: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      index: true,
    },
    name: String,
    email: String,
    phone: String,
    mobile:String,
    industry: String,
    website: String,
    address: {
      addressLine1:String,
      village: String,
      district: String,
      state: String,
      pinCode: String,
    },
    logo: Object,
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
  },
  {
    timestamps: true,
  }
);


const ComapanyObj = mongoose.model('Company', CompanySchema);
module.exports = ComapanyObj;