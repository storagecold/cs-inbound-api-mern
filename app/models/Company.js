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
    chamberNo: [{
      type: Number,
      required: true,
      index: true,
      default: 1,
      enum: [1, 2, 3, 4]
    }],
    name: String,
    email: String,
    phone: String,
    mobile:String,
    industry: String,
    website: String,
    address: {
      addressLine1:String,
      addressLine2:String,
      village: String,
      tehsil: String,
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