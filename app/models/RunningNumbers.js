const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunningNumberSchema = new Schema({
    accountNumberKey: String,
    accountNumberValue: { type: Number, default: 1000 },
    amadNumberKey: String,
    amadNumberValue: { type: Number, default: 100 },
    savedYearKey: String,
    savedYearValue: { type: Number, default: 1975 },
    amadSrNoKey: String,
    amadSrNoValue: { type: Number },
    nikasiSrNoKey: String,
    nikasiSrNoValue: { type: Number },
    paymentSrNoKey: String,
    paymentSrNoValue: { type: Number },
    receiptSrNoKey: String,
    receiptSrNoValue: { type: Number },
    bardanaSrNoKey: String,
    bardanaSrNoValue: { type: Number },

}, { timestamps: true });

const RunningNumberObj = mongoose.model('RunningNumber', RunningNumberSchema);
module.exports = RunningNumberObj;
