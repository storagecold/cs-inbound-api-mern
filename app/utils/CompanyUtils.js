const CompanyObj = require("../models/Company");
const Joi = require("joi");

module.exports = {
    CompanyExists: async function (query) {
        return await CompanyObj.findOne(query);
    },
    ComapnyValidate: function (body) {
        const schema = Joi.object({
            companyCode: Joi.string().required(),
            organization: Joi.string().required(),
            chamberNo: Joi.array().items(
                Joi.number().integer().valid(1, 2, 3, 4).required()
            ),
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
            industry: Joi.string(),
            website: Joi.string(),
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
                pinCode: Joi.number(),
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
