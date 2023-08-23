const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
    token: {
        type: String,
        unique: true
    },
    email: String,
    expiryTime: Date
});


const ForgotPassswordObj = mongoose.model('ForgotPasssword', ForgotPasswordSchema);
module.exports = ForgotPassswordObj;