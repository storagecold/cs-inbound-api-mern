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
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const OrganizationObj = mongoose.model('Organization', OrganizationSchema);
module.exports = OrganizationObj;