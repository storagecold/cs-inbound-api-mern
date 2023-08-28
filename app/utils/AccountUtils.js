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

    GetAccountNumber: async (value) => {
        const update = { $inc: { accountNumberValue: 1 } };
        const options = { new: true, upsert: true };
        const query = { accountNumberKey: "accountNumberValue" };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.accountNumber = runningNumber ? runningNumber.accountNumberValue : 99999
    },

    AccountValidate: function (body) {
        const addressSchema = Joi.object({
            village: Joi.string(),
            city: Joi.string(),
            district: Joi.string(),
            state: Joi.string(),
            pinCode: Joi.number().integer()
        });
        const bankAccountSchema = Joi.object({
            accNumber: Joi.number().required(),
            accName: Joi.string().required(),
            bankName: Joi.string().required(),
            branchName: Joi.string().required(),
            ifscCode: Joi.string().required(),
          });

        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('kisan', 'staff', 'others'),
            accountNumber: Joi.number().integer(),
            firstName: Joi.string().allow(''),
            lastName: Joi.string().allow(''),
            careOf: Joi.string().valid('S/O', 'W/O', 'D/O'),
            careOfName: Joi.string().allow(''),
            address: addressSchema,
            mobile: Joi.string().allow(''),
            adharNo: Joi.number().integer().allow(null),
            panNO: Joi.string().allow(''),
            email: Joi.string().email().allow(''),
            bankDetails: Joi.array().items(bankAccountSchema),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(null),
            updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(null)
        });


        return schema.validate(body)

    }
}
