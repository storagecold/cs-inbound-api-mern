const AccountObj = require('../models/Account');
const RunningNumberObj = require('../models/RunningNumbers');
const Joi = require('joi');

module.exports = {
    AccountExists: async function (query) {

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
            addressLine1: Joi.string()
                .alphanum()
                .min(3)
                .max(15)
                .required()
                .messages({
                    'string.alphanum': 'Value should contain only alphanumeric characters.',
                    'string.min': 'Value should be at least 3 characters long.',
                    'string.max': 'Value should not exceed 15 characters.',
                    'any.required': 'Value is required.',
                }),
            addressLine2: Joi.string()
                .alphanum()
                .min(3)
                .max(15)
                .required()
                .messages({
                    'string.alphanum': 'Value should contain only alphanumeric characters.',
                    'string.min': 'Value should be at least 3 characters long.',
                    'string.max': 'Value should not exceed 15 characters.',
                    'any.required': 'Value is required.',
                }),
            cityVillage: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 15 characters long.').required(),
            district: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 15 characters long.').required(),
            state: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 50 characters long.').required(),
            pinCode: Joi.number().integer()
        });
        const bankAccountSchema = Joi.object({
            accNumber: Joi.number().required(),
            accName: Joi.string().required().trim().min(3).max(15).regex(/^[a-zA-Z\s]+$/),
            bankName: Joi.string().required().trim().min(3).max(15).regex(/^[a-zA-Z\s]+$/),
            branchName: Joi.string().required().trim().min(3).max(15).regex(/^[a-zA-Z\s]+$/),
            ifscCode: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        });

        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('kisan', 'staff', 'others'),
            accountNumber: Joi.number().integer(),
            firstName: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 15 characters long.').required(),
            lastName: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 15 characters long.').required(),
            careOf: Joi.string().valid('S/O', 'W/O', 'D/O'),
            careOfName: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .regex(/^[a-zA-Z\s]+$/)
                .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 15 characters long.').required(),
            address: addressSchema,
            mobile: Joi.string()
            .regex(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Mobile number should be exactly 10 numeric digits.',
                'any.required': 'Mobile number is required.',
            }),
            adharNo: JJoi.string()
            .regex(/^[0-9]{12}$/)
            .required()
            .messages({
                'string.pattern.base': 'adhar number should be exactly 12 numeric digits.',
                'any.required': 'adhar number is required.',
            }),
            panNO: Joi.string().alphanum()
            .min(3)
            .max(15),
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
