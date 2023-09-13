const Joi = require('joi');
const AmadObj = require('../models/Amad');
const NikasiObj = require('../models/Nikasi');
const RunningNumberObj = require('../models/RunningNumbers');

module.exports = {
    AmadExists: async function (query) {

        return await AmadObj.findOne(query);
    },
    GetAmadNo: async (value) => {
        const query = { amadNumberKey: "amadNumberValue" };
        const currentYear = new Date().getFullYear();
        const savedYearDoc = await RunningNumberObj.findOne({ savedYearKey: "savedYearValue" });
        const savedYear = savedYearDoc ? savedYearDoc.savedYearValue : null;

        if (!savedYear || savedYear < currentYear) {
            await RunningNumberObj.findOneAndUpdate(query, { amadNumberValue: 0 });
        }

        const update = { $inc: { amadNumberValue: 1 } };
        const options = { new: true, upsert: true };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.amadNo = runningNumber ? runningNumber.amadNumberValue : 999;
    },
    GetamadSrNo: async (value) => {
        const query = { amadSrNoKey: "amadSrNoValue" };
        const currentYear = new Date().getFullYear();
        const savedYearDoc = await RunningNumberObj.findOne({ savedYearKey: "savedYearValue" });
        const savedYear = savedYearDoc ? savedYearDoc.savedYearValue : null;

        if (!savedYear || savedYear < currentYear) {
            await RunningNumberObj.findOneAndUpdate(query, { amadSrNoValue: 0 });
        }
        const update = { $inc: { amadSrNoValue: 1 } };
        const options = { new: true, upsert: true };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.amadSrNo = runningNumber ? runningNumber.amadSrNoValue : 99999
    },
    AmadValidate: function (body) {
        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            account: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            amadPkt: Joi.number().integer().required(),
            kism: Joi.string().valid('3797', 'LOKAR', 'kHIYATI', '302').required(),
            year: Joi.number().integer(),
            amadNo: Joi.number().integer(),
            chamberNo: Joi.number().integer().valid(1, 2, 3, 4).required(),
            grading: Joi.string().valid('CHATTA', 'GULLA', 'KIRRI', 'MIX'),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
            updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
            _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        });
        return schema.validate(body)

    }
}
