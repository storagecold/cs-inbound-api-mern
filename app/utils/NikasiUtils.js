const NikasiObj = require('../models/Nikasi');
const RunningNumberObj = require('../models/RunningNumbers');
const Joi = require('joi');

module.exports = {
    NikasiExists: async function (query) {

        return await NikasiObj.findOne(query);
    },

    GetNikasiSrNo: async (value) => {
        const query = { nikasiSrNoKey: "nikasiSrNoValue" };
        const currentYear = new Date().getFullYear();
        const savedYearDoc = await RunningNumberObj.findOne({ savedYearKey: "savedYearValue" });
        const savedYear = savedYearDoc ? savedYearDoc.savedYearValue : null;

        if (!savedYear || savedYear < currentYear) {
            await RunningNumberObj.findOneAndUpdate(query, { nikasiSrNoValue: 0 });
        }

        const update = { $inc: { nikasiSrNoValue: 1 } };
        const options = { new: true, upsert: true };

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.nikasiSrNo = runningNumber ? runningNumber.nikasiSrNoValue : 999;
    },

    nikasiValidate: function (body) {
        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            account: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            amad: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            nikasiPkt: Joi.number().integer().required(),
            kism: Joi.string().valid('3797', 'LOKAR', 'kHIYATI', '302').required(),
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
