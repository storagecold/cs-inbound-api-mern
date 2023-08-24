const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RunningNumberObj = require('./RunningNumbers')
const AccountSchema = new Schema({
    accountNumber: Number,
    firstName: String,
    lastName: String,
    mobile: String,
    careOf: {
        type: String,
        enum: ['S/O', 'W/O', 'D/O']
    },
    careOfName: String,
    address: Object,
    type: {
        type: String,
        enum: ['kisan', 'staff', 'others']
    },
  
    bankAccount: [{
        type: Schema.Types.ObjectId,
        ref: 'BankAccount',
        index: true
    }],

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

// Middleware to generate and set accountNumber before saving
AccountSchema.pre('save', async function (next) {
    try {
        if (!this.accountNumber) {
            this.accountNumber = await getAccountNumber();
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Function to get the next account number
const getAccountNumber = async () => {
    const update = { $inc: { accountNumberValue: 1 } };
    const options = { new: true, upsert: false };
    const query = { accountNumberKey: "accountNumberValue" };

    const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();
    return runningNumber ? runningNumber.accountNumberValue : 99999;
};

const AccountObj = mongoose.model('Account', AccountSchema);
module.exports = AccountObj;
