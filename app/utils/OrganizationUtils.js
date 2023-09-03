const OrganizationObj = require('../models/Organization');
const Joi = require('joi');

module.exports = {
    OrganizationExists: async function (query) {
        return await OrganizationObj.findOne(query);
    },

    OrganizationValidate: function (body) {
        const schema = Joi.object({
          name: Joi.string().max(30).required(),
          email: Joi.string().email().required(),
          phone: Joi.string()
            .regex(/^\d{1,12}$/)
            .required(),
          mobile: Joi.string()
            .regex(/^\d{1,10}$/)
            .required(),
          industry: Joi.string().max(15).required(),
          website: Joi.string(),
          address: Joi.object({
            addressLineOne: Joi.string(),
            city: Joi.string(),
            district: Joi.string(),
            state: Joi.string(),
            pinCode: Joi.string(),
          }).required(),
          logo: Joi.object({
            originalName: Joi.string(),
            location: Joi.string(),
            key: Joi.string(),
          }),
          owner: Joi.array().items(Joi.string().required()),
          isDeleted: Joi.boolean(),
          deletedAt: Joi.date().allow(null),
          createdBy: Joi.string(),
          updatedBy: Joi.string(),
        });


        return schema.validate(body)

    }
}
