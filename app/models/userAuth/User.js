const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, unique: true, required: true, index: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'member']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true
    },
    mobile: String,
    password: String,
    firstName: String,
    lastName: String,
    lastLogin: Object,
    isDeleted: {type: Boolean, default: false},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});
const UserObj = mongoose.model('User', userSchema);
module.exports = UserObj;
