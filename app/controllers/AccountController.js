const AccountObj = require('../models/Account');
const globalModules = require('../helpers/globalModules');
const AccountUtils = require('../utils/AccountUtils');
const CompanyUtils = require('../utils/CompanyUtils');
const addressUtils = require('../utils/AddressUtils');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    accountNotFound: 'Account does not exist.',
    addressNotFound: "The organization does not appear to exist. Admin, kindly consider adding a new address.",
    accountExists: 'Account with these details already exists.',
    saveSuccess: 'Account added successfully.',
    saveError: 'Error saving Account data.',
    updateSuccess: 'Account updated successfully.',
    retrieveSuccess: 'Account retrieved successfully.',
    updateError: 'Error updating Account data.',
    fetchError: 'Error fetching Account.',
    deleteError: 'Error deleting Account.',
    deleteError: 'Error deleting Account.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Account restored successfully.',
    restoreError: 'Error restoring Account.',
};

exports.createAccount = async (req, res) => {
    try {
        const { error, value } = AccountUtils.AccountValidate(req.body);
        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message
            });
        }

        const companyExists = await CompanyUtils.CompanyExists({ _id: value.company });
        if (!companyExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        let accountQuery = {
            firstName: value.firstName,
            careOfName: value.careOfName,
            "address.village": value.address.village,
            "address.tehsil": value.address.tehsil,
            "address.district": value.address.district
        }
        const accountExists = await AccountUtils.AccountExists(accountQuery);
        if (accountExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountExists,
            });
        };
        let query = {
            state: value.address.state,
            district: value.address.district,
            tehsil: value.address.tehsil,
            village: value.address.village
        }
        const address = await addressUtils.existsAddress(query);
        if (!address) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressNotFound
            });
        };

        value.firstName = globalModules.firstLetterCapital(value.firstName);
        value.lastName = globalModules.firstLetterCapital(value.lastName);


        await AccountUtils.GetAccountNumber(value);

        const newAccount = new AccountObj(value);
        const savedAccount = await newAccount.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.saveSuccess,
            data: savedAccount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.saveError,
        });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const { error, value } = Utils.AccountValidate(req.body);
        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message
            });
        }
        let query = {
            state: value.address.state,
            district: value.address.district,
            tehsil: value.address.tehsil,
            village: value.address.village
        }
        const address = await addressUtils.existsAddress(query);
        if (!address) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressNotFound
            });
        };

        const { firstName, accountNumber } = value;

        if (firstName) {
            firstName = globalModules.firstLetterCapital(firstName);
        }
        const existingAccount = await AccountObj.findOne({ accountNumber });

        if (!existingAccount) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.accountNotFound,
            });
        }

        existingAccount.set(value);
        const updatedAccount = await existingAccount.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            data: updatedAccount,
            message: STATUS_MESSAGES.updateSuccess,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 500,
            message: STATUS_MESSAGES.updateError,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const accountToSoftDelete = await AccountObj.findOne({ accountNumber, isDeleted: false });

        if (!accountToSoftDelete) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.accountNotFound,
            });
        }

        accountToSoftDelete.isDeleted = true;
        accountToSoftDelete.deletedAt = new Date();
        const data = await accountToSoftDelete.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.recordDeleted,
        });

    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            message: STATUS_MESSAGES.deleteError,
            messageId: 500,
        });
    }
};
exports.restoreAccount = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const accountToRestore = await AccountObj.findOne({ accountNumber, isDeleted: true });

        if (!accountToRestore) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.accountNotFound,
            });
        }

        accountToRestore.isDeleted = false;
        accountToRestore.deletedAt = new Date();
        const data = await accountToRestore.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.restoreSuccess,
            data: data,
        });

    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            message: STATUS_MESSAGES.restoreError,
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
            isDeleted: false
        }

        const data = await AccountObj.find(query)
            .populate('company', 'name')
            .populate('createdBy', 'role email')
            .populate('updatedBy', 'role email')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort({ updatedAt: -1 });
        const totalCount = await AccountObj.countDocuments(query);

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            data: data,
            totalCount
        });
    } catch (error) {
        res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};

exports.getAccountByNumber = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const account = await AccountObj.findOne({ accountNumber });

        if (!account) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.accountNotFound
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: account
        });
    } catch (error) {
        res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
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

        const accountsList = await AccountObj.find(query);
        const totalCount = await AccountObj.countDocuments(query);

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: accountsList,
            totalCount
        });
    } catch (error) {
        return res.json({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};
