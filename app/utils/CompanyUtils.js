const CompanyObj = require('../models/Company');
const Joi = require('joi');

module.exports = {
    CompanyExists: async function (value) {
        let query = {
            name: value.name,
            email:value.email,
            companyCode:value.companyCode,
            "address.city": value.address.city
        }
        return await CompanyObj.findOne(query);
    },
    ComapnyValidate: function (body) {
        const schema = Joi.object({
            companyCode: Joi.string().required(),
            organization: Joi.string().required(), 
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
          
            industry: Joi.string(),
            website: Joi.string(),
            address: Joi.object({
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