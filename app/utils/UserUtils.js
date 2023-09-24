const UserObj = require('../models/userAuth/User')
const Joi = require("joi");

module.exports = {
    isAdmin: async function (query) {
        return await UserObj.findOne(query, {role: 1});
    },
    userExists: async function (query) {
        return await UserObj.findOne(query);
    },
    userValidate: function (body) {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            role: Joi.string()
                .trim()
                .valid(
                    "admin",
                    "manager",
                    "member")
                .required(),
            company: Joi.string()
                .trim()
                .min(1)
                .required(),
            mobile: Joi.string()
                .pattern(/^[0-9]{10}$/)
                .required(),
            password: Joi.string()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
                    'password')
                .required(),
            firstName: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
            lastName: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .pattern(/^[a-zA-Z\s]+$/)
                .required(),
        });

        return schema.validate(body);
    },
}