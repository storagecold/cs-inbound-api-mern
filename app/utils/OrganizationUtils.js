const OrganizationObj = require('../models/Organization');
const Joi = require('joi');

module.exports = {
    OrganizationExists: async function (value) {
        let query = {
            name: value.name,
            email:value.email,
            "address.city": value.address.city
        }
        return await OrganizationObj.findOne(query);
    },

    OrganizationValidate: function (body) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string(),
            mobile: Joi.string(),
            industry: Joi.string(),
            website: Joi.string(),
            address: Joi.object({
              city: Joi.string(),
              district: Joi.string(),
              state: Joi.string(),
              pinCode: Joi.string()
            }),
            logo: Joi.object({
              originalName: Joi.string(),
              location: Joi.string(),
              key: Joi.string()
            }),
            owner: Joi.array().items(Joi.string())
          });


        return schema.validate(body)

    }
}
