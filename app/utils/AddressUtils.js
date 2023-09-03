const Joi = require('joi');

module.exports = {
    validateAddress: async function (body) {
        const alphaSpace = Joi.string().regex(/^[A-Za-z\s]+$/);

        const villageSchema = Joi.object({
            village: alphaSpace.required(),
        });

        const tehsilSchema = Joi.object({
            tehsil: alphaSpace.required(),
            villages: Joi.array().items(villageSchema),
        });

        const districtSchema = Joi.object({
            district: alphaSpace.required(),
            tehsils: Joi.array().items(tehsilSchema),
        });

        const stateSchema = Joi.object({
            state: alphaSpace.required(),
            districts: Joi.array().items(districtSchema),
        });

        const addressSchema = Joi.object({
            states: Joi.array().items(stateSchema),
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming ObjectId is a string
            isDeleted: Joi.boolean().default(false),
            deletedAt: Joi.date().allow(null).default(null),
            createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming ObjectId is a string
            updatedBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming ObjectId is a string
            createdAt: Joi.date().timestamp().default(Date.now),
            updatedAt: Joi.date().timestamp().allow(null).default(null),
        });
        return addressSchema.validate(body);
    }
}



