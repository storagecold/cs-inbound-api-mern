const OrganizationObj = require('../models/Organization');
const Joi = require('joi');

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
        .regex(/^[a-zA-Z\s]+$/)
        .message('Name must contain only letters (a-z or A-Z) and spaces, and be between 3 and 50 characters long.').required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .regex(/^[0-9]+$/)
        .messages('phone number should contain only numbers.'),
      mobile: Joi.string()
        .regex(/^[0-9]{10}$/)
        .required()
        .messages({
          'string.pattern.base': 'Mobile number should be exactly 10 numeric digits.',
          'any.required': 'Mobile number is required.',
        }),
      industry: Joi.string().trim().min(3).max(15).required().regex(/^[a-zA-Z\s]+$/),
      website: Joi.string(),
      address: Joi.object({
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
        cityVillage: Joi.string().trim().min(3).max(15).required().regex(/^[a-zA-Z\s]+$/),
        district: Joi.string().trim().min(3).max(15).required().regex(/^[a-zA-Z\s]+$/),
        state: Joi.string().trim().min(3).max(15).required().regex(/^[a-zA-Z\s]+$/),
        pinCode: Joi.number()
      }).required(),
      logo: Joi.object({
        originalName: Joi.string(),
        location: Joi.string(),
        key: Joi.string()
      }),
      owner: Joi.array().items(Joi.string().required().trim().min(3).max(15).required().regex(/^[a-zA-Z\s]+$/)),
      isDeleted: Joi.boolean(),
      deletedAt: Joi.date().allow(null),
      createdBy: Joi.string(),
      updatedBy: Joi.string()
    });


    return schema.validate(body)

  }
}