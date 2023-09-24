const accountObj = require('../models/Account');
const runningNumberObj = require('../models/RunningNumbers');
const Joi = require('joi');

module.exports = {
    accountExists: async function (query) {
        return await accountObj.findOne(query);
    },

    getAccountNumber: async (value) => {
        const update = {$inc: {accountNumberValue: 1}};
        const options = {new: true, upsert: true};
        const query = {accountNumberKey: "accountNumberValue"};

        const runningNumber = await runningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.accountNumber = runningNumber ? runningNumber.accountNumberValue : 99999
    },

    accountValidate: function (body) {
        const addressSchema = Joi.object({
            addressLine1: Joi.string()
                .min(3)
                .max(15),
            addressLine2: Joi.string()
                .alphanum().allow('')
                .min(3)
                .max(15),
            village: Joi.string()
                .trim()
                .min(3)
                .max(30)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            tehsil: Joi.string()
                .trim()
                .min(3)
                .max(30)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            district: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            state: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            pinCode: Joi.number()
                .integer()
                .min(100000)
                .max(999999)
                .required(),
        });
        const bankAccountSchema = Joi.object({
            bankAccountNumber: Joi.string().pattern(/^[0-9]{9,18}$/).required(),
            bankAccountName: Joi.string().required().trim().min(3).max(255).regex(/^[a-zA-Z\s]+$/),
            bankName: Joi.string().required().trim().min(3).max(255).regex(/^[a-zA-Z\s]+$/),
            branchName: Joi.string().required().trim().min(3).max(255).regex(/^[a-zA-Z\s]+$/),
            ifscCode: Joi.string().alphanum().length(11).required(),
        }).required();

        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-zA-Z]{24}$/).required(),
            type: Joi.string().valid('kisan', 'staff', 'others').required(),
            accountNumber: Joi.number().integer(),
            firstName: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .required()
                .regex(/^[a-zA-Z\s]+$/),

            lastName: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .required()
                .regex(/^[a-zA-Z\s]+$/),
            careOf: Joi.string().allow('').optional(),
            careOfName: Joi.string().required(),
            address: addressSchema,
            mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
            adharNo: Joi.string().pattern(/^\d{4}\s\d{4}\s\d{4}$/).required(),
            panNo: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).allow('').required(),
            email: Joi.string().email().allow('').required(),
            bankDetails: Joi.array().items(bankAccountSchema).required(),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(null),
            updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(null),
            _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(null)
        })
        return schema.validate(body)
    }
}
