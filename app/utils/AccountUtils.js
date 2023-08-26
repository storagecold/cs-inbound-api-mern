const AccountObj = require('../models/Account');
const RunningNumberObj = require('../models/RunningNumbers');
const Joi = require('joi');

module.exports = {
    AccountExists: async function (value) {
        let query = {
            firstName: value.firstName,
            careOfName: value.careOfName,
            "address.village": value.address.village
        }
        return await AccountObj.findOne(query);
    },

    // Function to get the next account number
    GetAccountNumber: async (value) => {
        const update = { $inc: { accountNumberValue: 1 } };
        const options = { new: true, upsert: true };
        const query = { accountNumberKey: "accountNumberValue" };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

         value.accountNumber = runningNumber ? runningNumber.accountNumberValue : 99999
    },

    AccountValidate: function(body){
        const schema = Joi.object({
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            mobile: Joi.string().trim().required(),
            careOf: Joi.string().valid('S/O', 'W/O', 'D/O').trim(),
            careOfName: Joi.string().trim(),
            address: Joi.object({
                village: Joi.string().trim(),
                city: Joi.string().trim(),
                state: Joi.string().trim(),
                pinCode: Joi.string().trim(),
        
            }),
            type: Joi.string().valid('kisan', 'staff', 'others').trim(),
            bankAccount: Joi.array().items(Joi.object({
                accountHolderName: Joi.string().trim().required(),
                accountNumber: Joi.string().trim().required(),
                bankName: Joi.string().trim().required(),
                branch: Joi.string().trim().required(),
                ifscCode: Joi.string().trim().required()
            })),
        });
   return schema.validate(body)
       
    }
}
