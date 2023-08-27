const AccountObj = require('../models/Account');
const globalModules = require('../helpers/globalModules');
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
       const accountExists= await Utils.AccountExists(value,res);
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
        const { accountNumber } = req.body;
        const existingAccount = await AccountObj.findOne({ accountNumber });

        if (!existingAccount) {
            return res.status(404).json({ status: 'error', message: 'Account not found.' });
        }
        existingAccount.set(req.body);
        const updatedAccount = await existingAccount.save();

        res.json({ status: 'success', data: updatedAccount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating account data.' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const accountToSoftDelete = await AccountObj.findOne({ accountNumber });

        if (!accountToSoftDelete) {
            return res.status(404).json({ status: 'error', message: 'Account not found.' });
        }

        // Mark the account as deleted
        accountToSoftDelete.isDeleted = true;
        accountToSoftDelete.deletedAt = new Date();
        await accountToSoftDelete.save();

        res.json({ status: 'success', message: 'Account soft-deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error soft-deleting account.' });
    }
};

exports.getAccountsList = async (req, res) => {
    try {
        // Fetch non-deleted accounts
        const accountsList = await AccountObj.find({ deleted: false });
        const totalCount = await AccountObj.countDocuments();

        res.json({ status: 'success', data: accountsList, totalCount });
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


