const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunningNumberSchema = new Schema({
    accountNumberKey: String,
    accountNumberValue: {type:Number,default:1000},
    amadNumberKey: String,
    amadNumberValue: {type:Number,default:100},

}, { timestamps: true });

const RunningNumberObj = mongoose.model('RunningNumber', RunningNumberSchema);
module.exports = RunningNumberObj;
