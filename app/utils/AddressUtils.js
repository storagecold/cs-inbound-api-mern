const Joi = require('joi');
const AddressObj = require('../models/Address');

module.exports = {
    existsAddress: async function (value) {
        const address = await AddressObj.findOne({
            'states.name': value.state,
            'states.districts.name': value.districts,
            'states.districts.tehsils.name': value.tehsil,
            'states.districts.tehsils.villages.name': value.village
        })
        return address
    },
    validateAddress: async function (body) {
        const villageSchema = Joi.object({
            village: Joi.string().required(),
        });

        const tehsilSchema = Joi.object({
            tehsil: Joi.string().required(),
            villages: Joi.array().items(villageSchema),
        });

        const districtSchema = Joi.object({
            district: Joi.string().required(),
            tehsils: Joi.array().items(tehsilSchema),
        });

        const stateSchema = Joi.object({
            state: Joi.string().required(),
            districts: Joi.array().items(districtSchema),
        });

        const addressSchema = Joi.object({
            states: Joi.array().items(stateSchema),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string(),
            updatedBy: Joi.string(),
        });
        return addressSchema.validate(body);
    }
}



