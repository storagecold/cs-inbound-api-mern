const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmadSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    amadNo: Number,
    lotNumber: String,
    packet: Number,
    year: String
}, { timestamps: true });

const AmadObj = mongoose.model('Amad', AmadSchema);
module.exports = AmadObj;
