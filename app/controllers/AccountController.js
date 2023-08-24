const AccountObj = require('../models/Account');
const globalModules = require('../helpers/globalModules');
const Joi = require('joi');
 
 const schema = Joi.object({
    accountNumber: Joi.number().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    mobile: Joi.string().trim().required(),
    careOf: Joi.string().valid('S/O', 'W/O', 'D/O').trim(),
    careOfName: Joi.string().trim(),
    address: Joi.object({
        street: Joi.string().trim(),
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        postalCode: Joi.string().trim(),
        country: Joi.string().trim()
    }),
    type: Joi.string().valid('kisan', 'staff', 'others').trim(),
    bankAccount: Joi.array().items(Joi.object({
        accountHolderName: Joi.string().trim().required(),
        accountNumber: Joi.string().trim().required(),
        bankName: Joi.string().trim().required(),
        branch: Joi.string().trim().required(),
        ifscCode: Joi.string().trim().required()
    })),
});

exports.createAccount = async (req, res) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        if (value.firstName) {
            value.firstName = globalModules.firstLetterCapital(value.firstName);
        }
        const accountExists = await AccountObj.exists({ accountNumber: value.accountNumber });

        if (accountExists) {
            return res.status(400).json({ status: 'error', message: 'Account with this account number already exists.' });
        }

        const newAccount = new AccountObj(value);
        const savedAccount = await newAccount.save();

        res.json({ status: 'success', data: savedAccount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error saving account data.' });
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

exports.DeleteAccount = async (req, res) => {
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


exports.getAccountsList = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { accountNumber: search },
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { 'address.city': { $regex: search, $options: 'i' } } 
                ]
            };
        }
        const totalCount = await AccountObj.countDocuments(query);

        // Fetch accounts based on the search query
        const accountsList = await AccountObj.find(query);

        res.json({ status: 'success', data: accountsList, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching accounts list.' });
    }
};

exports.searchAccountsList = async (req, res) => {
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
                    { 'address.city': { $regex: trimmedSearch, $options: 'i' } }
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
