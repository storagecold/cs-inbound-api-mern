const CompanyObj = require('../models/Company');
const Joi = require('joi');

module.exports = {
    CompanyExists: async function (query) {
      
        return await CompanyObj.findOne(query);
    },
    ComapnyValidate: function (body) {
        const schema = Joi.object({
            companyCode: Joi.string().max(30).required(),
            organization: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            mobile: Joi.number().max(10).required(),
            phone: Joi.number().max(12),
            industry: Joi.string(),
            website: Joi.string(),
            address: Joi.object({
                addressLineOne: Joi.string(),
                city: Joi.string(),
                district: Joi.string(),
                state: Joi.string(),
                pinCode: Joi.string()
            }),
            logo: Joi.object(),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string(),
            updatedBy: Joi.string()
        });
        return schema.validate(body)

    }
}