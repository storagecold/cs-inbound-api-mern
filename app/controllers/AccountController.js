const AccountObj = require('../models/Account');
const globalModules = require('../helpers/globalModules');
const constantObj = require('../config/Constants')
const Joi = require('joi');
const Utils = require('../utils/AccountUtils')
exports.createAccount = async (req, res) => {
    try {
        const { error, value } = Utils.AccountValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        value.firstName = globalModules.firstLetterCapital(value.firstName);
        value.lastName = globalModules.firstLetterCapital(value.lastName);
        const accountExists = await Utils.AccountExists(value, res);
        if (accountExists) {
            return res.status(400).json({ status: 'error', message: 'Account with this details already exists.' });
        }
        await Utils.GetAccountNumber(value);
        const newAccount = new AccountObj(value);
        const savedAccount = await newAccount.save();

        res.json({ status: "success", data: savedAccount });
    } catch (error) {
        res
            .status(500)
            .json({ status: "error", message: "Error saving account data." });
    }

};

exports.updateAccount = async (req, res) => {
    try {
        if (req.body.firstName) {
            req.body.firstName = globalModules.firstLetterCapital(req.body.firstName);
        }
        const { _id } = req.body;
        const existingAccount = await AccountObj.findOne({ _id });

        if (!existingAccount) {
            return res.jsonp({
                status: "error",
                messageId: 404,
                message: `Account ${constantObj.messages.NotExists}`,
            });
        }
        existingAccount.set(req.body);
        const updatedAccount = await existingAccount.save();
        return res.jsonp({
            status: "success",
            messageId: 200,
            data: updatedAccount,
            message: `Account ${constantObj.messages.RecordUpdated}`,
        });
    } catch (error) {
        return res.jsonp(errorHandler(error.message));
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { _id } = req.params.id;
        const accountToSoftDelete = await AccountObj.findOne({ _id });

        if (!accountToSoftDelete) {
            return res.jsonp({
                status: "error",
                messageId: 404,
                message: `Account ${constantObj.messages.NotExists}`,
            });
        }

        accountToSoftDelete.isDeleted = true;
        accountToSoftDelete.deletedAt = new Date();
        const data = await accountToSoftDelete.save();

        return res.jsonp({
            status: "success",
            message: "Account soft-deleted successfully.",
            messageId: 200,
            data: data,
        });

    } catch (error) {
        return res.jsonp({
            status: "error",
            message: "Error soft-deleting account.",
            messageId: 500,
        });
    }
};

exports.getAccountsList = async (req, res) => {
    try {
        let perPage = Number(req.params.perPage) || 10;
        let page = Number(req.params.page) || 1;
        const { companyId } = req.params;

        let query = {
            company: companyId,
            deleted: false
        }

        const data = await AccountObj.find(query)
        .populate('customer', 'name')
        .populate('createdBy', 'firstName lastName')
        .populate('updatedBy', 'firstName lastName')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({ updatedAt: -1 });
        const totalCount = await AccountObj.countDocuments(query);

        res.json({ status: 'success', data, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching accounts list.' });
    }
};

exports.getAccountByNumber = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const account = await AccountObj.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({ status: 'error', message: 'Account not found.' });
        }

        res.json({ status: 'success', data: account });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching account.' });
    }
};

exports.searchAccount = async (req, res) => {
    try {
        const { search } = req.query;
        const trimmedSearch = search ? search.trim() : '';

        let query = {};

        if (trimmedSearch) {
            query = {
                $or: [
                    { accountNumber: trimmedSearch },
                    { firstName: { $regex: trimmedSearch, $options: 'i' } },
                    { lastName: { $regex: trimmedSearch, $options: 'i' } },
                    { 'address.village': { $regex: trimmedSearch, $options: 'i' } }
                ]
            };
        }

        // Fetch accounts based on the search query
        const accountsList = await AccountObj.find(query);

        // Fetch the total count of matching records
        const totalCount = await AccountObj.countDocuments(query);

        res.json({ status: 'success', data: accountsList, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching accounts list.' });
    }
};


