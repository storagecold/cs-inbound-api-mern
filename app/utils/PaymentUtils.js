const Joi = require('joi');
const paymentObj = require('../models/Payment');
const runningNumberObj = require('../models/RunningNumbers');

module.exports = {
    paymentExists: async function (query) {

        return await paymentObj.findOne(query);
    },

    getVoucherNo: async (value) => {
        const query = {paymentSrNoKey: "paymentSrNoValue"};

        const update = {$inc: {paymentSrNoValue: 1}};
        const options = {new: true, upsert: true};

        const runningNumber = await RunningNumberObj.findOneAndUpdate(query, update, options).exec();

        value.voucherNo = runningNumber ? runningNumber.paymentSrNoValue : 99999
    },
    validateAmad: function (body) {
        const schema = Joi.object({
            company: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            account: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            voucherNo: Joi.number(),
            isDeleted: Joi.boolean(),
            deletedAt: Joi.date().allow(null),
            createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
            updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
            _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        });
        return schema.validate(body)

    }
}
