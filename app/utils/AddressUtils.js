const Joi = require('joi');
const AddressObj = require('../models/Address');

module.exports = {
    existsAddress: async function (value) {
        const address = await AddressObj.findOne({
            state: value.state,
            district: value.districts,
            tehsil: value.tehsil,
            village: value.village
        })
        return address
    },
    validateAddress: async function (body) {

        const alphaSpaceRegex = /^[A-Za-z ]+$/; 

        const addressSchema = Joi.object({
            village: Joi.string().regex(alphaSpaceRegex).required(),
            tehsil: Joi.string().regex(alphaSpaceRegex).required(),
            district: Joi.string().regex(alphaSpaceRegex).required(),
            state: Joi.string().regex(alphaSpaceRegex).required(),
            createdBy: Joi.string().alphanum().length(24), 
            updatedBy: Joi.string().alphanum().length(24),
        }).options({ abortEarly: false });
        return addressSchema.validate(body);
    }
}



