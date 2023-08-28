const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    mobile: String,
    industry: String,
    website: String,
    address: {
        city:String,
        district:String,
        state:String,
        pinCode:String
    },
    logo: Object,
    owner: [String],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const OrganizationObj = mongoose.model('Organization', OrganizationSchema);
module.exports = OrganizationObj;