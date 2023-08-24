const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunningNumberSchema = new Schema({
    accountNumberKey: String,
    accountNumberValue: Number,
    amadNumberKey: String,
    amadNumberValue: Number,

}, { timestamps: true });

const RunningNumberObj = mongoose.model('RunningNumber', RunningNumberSchema);
module.exports = RunningNumberObj;
