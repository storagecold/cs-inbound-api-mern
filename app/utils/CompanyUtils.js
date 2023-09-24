const CompanyObj = require("../models/Company");
const Joi = require("joi");

module.exports = {
    companyExists: async function (query) {
        return await CompanyObj.findOne(query);
    },
    comapnyValidate: function (body) {
        const schema = Joi.object({
            companyCode: Joi.string()
                .trim()
                .alphanum()
                .min(8)
                .max(20)
                .required(),
            organization: Joi.string()
                .trim()
                .min(1)
                .required(),
            chamberNo: Joi.array().items(
                Joi.number()
                    .integer()
                    .min(1).max(10)
                    .required()
            ).required(),
            name: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .regex(/^[a-zA-Z\s]+$/)
                .required(),
            email: Joi.string().email().required(),
            phone: Joi.string().regex(/^[0-9]+$/),
            mobile: Joi.string()
                .regex(/^[0-9]{10}$/)
                .required(),
            industry: Joi.string()
                .trim()
                .min(3)
                .max(15)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            website: Joi.string()
                .uri({scheme: ['http', 'https']})
                .trim()
                .max(255)
                .required(),
            address: Joi.object({
                addressLine1: Joi.string().trim().min(3).max(255).required(),
                addressLine2: Joi.string().trim().min(3).max(255).optional(),
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
            }).required(),
            logo: Joi.object(),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string(),
            updatedBy: Joi.string(),
            _id: Joi.string(),
        });
        return schema.validate(body);
    },
};
