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

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

// // Middleware to generate and set accountNumber before saving
// AccountSchema.pre('save', async function (next) {
//     try {
//         if (!this.accountNumber) {
//             this.accountNumber = await getAccountNumber();
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Function to get the next account number
// const getAccountNumber = async () => {
//     const update = { $inc: { accountNumberValue: 1 } };
//     const options = { new: true, upsert: true }; // Set upsert to true
//     const query = { accountNumberKey: "accountNumberValue" };

//     const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();
//     console.log("runningNumber====>", runningNumber);
    
//     if (runningNumber) {
//         return runningNumber.accountNumberValue;
//     } else {
//         // If runningNumber is null, return a default value
//         return 99999;
//     }
// };


const AccountObj = mongoose.model('Account', AccountSchema);
module.exports = AccountObj;
