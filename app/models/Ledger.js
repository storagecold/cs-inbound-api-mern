const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedgerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    mobile: String,
    industry: String,
    website: String,
    address: Object,
    logo: Object,
    owner: [String],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const LedgerObj = mongoose.model('Ledger', LedgerSchema);
module.exports = LedgerObj;