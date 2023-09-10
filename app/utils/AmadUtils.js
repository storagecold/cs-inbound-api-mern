const AmadObj = require('../models/Amad');
const RunningNumberObj = require('../models/RunningNumbers');
const Joi = require('joi');

module.exports = {
    AmadExists: async function (query) {
      
        return await AmadObj.findOne(query);
    },

    GetAmadNo: async (value) => {
        const query = { amadNumberKey: "amadNumberValue" };
        const currentYear = new Date().getFullYear();
        const savedYear = await RunningNumberObj.findOne({ savedYearKey: "savedYearValue" }, { savedYearValue: 1 });
        if (savedYear < currentYear) {
            await RunningNumberObj.findOneAndUpdate(query, { amadNumberValue: 0 });
        }
        const update = { $inc: { amadNumberValue: 1 } };
        const options = { new: true, upsert: true };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.amadNo = runningNumber ? runningNumber.amadNumberValue : 999
    },

    AmadValidate: function (body) {
        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            account: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            packets: Joi.number().integer().required(),
            kism: Joi.array().items(Joi.string()),
            year: Joi.number().integer(),
            amadNo: Joi.number().integer(),
            chamberNo: Joi.number().integer().valid(1, 2, 3, 4).required(),
            grading: Joi.string().valid('CHATTA', 'GULLA', 'KIRRI', 'MIX'),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
            updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
        });
        return schema.validate(body)

    }
}
