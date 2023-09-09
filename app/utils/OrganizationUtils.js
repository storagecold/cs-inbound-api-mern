const OrganizationObj = require("../models/Organization");
const Joi = require("joi");

module.exports = {
  OrganizationExists: async function (query) {
    return await OrganizationObj.findOne(query);
  },
  OrganizationValidate: function (body) {
    const schema = Joi.object({
      name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string()
          .pattern(/^\(\d{2,5}\) \d{6,8}$/)
          .message('Invalid Indian landline phone number format'),
      mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      industry: Joi.string()
        .trim()
        .min(3)
        .max(15)
        .pattern(/^[a-zA-Z\s]+$/)
        .required(),
      website: Joi.string(),
      address: Joi.object({
        addressLine1: Joi.string().min(3).max(15),
        addressLine2: Joi.string()
          .min(3)
          .max(15)
          .pattern(/^[a-zA-Z\s]+$/),
        cityVillage: Joi.string()
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

      logo: Joi.object({
        originalName: Joi.string(),
        location: Joi.string(),
        key: Joi.string(),
      }),

      owner: Joi.array().items(
        Joi.string()
          .required()
          .trim()
          .min(3)
          .max(15)
          .pattern(/^[a-zA-Z\s]+$/)
      ),

      isDeleted: Joi.boolean(),

      deletedAt: Joi.date().allow(null),

      createdBy: Joi.string(),

      updatedBy: Joi.string(),
    });

    return schema.validate(body);
  },
};
