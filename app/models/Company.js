const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    companyCode: { type: String, unique: true, index: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      index: true,
    },
    name: String,
    email: String,
    phone: String,

    industry: String,
    website: String,
    address: Object,
    logo: Object,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ComapanyObj = mongoose.model('Company', CompanySchema);
module.exports = ComapanyObj;