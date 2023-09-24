const AmadObj = require('../models/Amad');
const AmadUtils = require('../utils/AmadUtils')
const AccountUtils = require('../utils/AccountUtils')
const adminUtils = require('../utils/UserUtils')
const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    amadNotFound: 'Amad does not exist.',
    accountExists: 'Amad does not exist.',
    companyNotFound: 'Company does not exist.',
    addressNotFound: "The address does not exist. Admin, kindly consider adding a new address.",
    amadExists: 'Amad with these details already exists.',
    saveSuccess: 'Amad added successfully.',
    saveError: 'Error saving Amad data.',
    updateSuccess: 'Amad updated successfully.',
    retrieveSuccess: 'Amad retrieved successfully.',
    updateError: 'Error updating Amad data.',
    fetchError: 'Error fetching Amad.',
    deleteError: 'Error deleting Amad.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Amad restored successfully.',
    restoreError: 'Error restoring Amad.',
    userNotAuthorizedUpdate: "Only Admin can update Nikasi.",
    userNotAuthorizedDelete: "Only Admin can delete Nikasi."
};

exports.createAmad = async (req, res) => {
    try {
        const { error, value } = AmadUtils.ValidateAmad(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        const accountExists = await AccountUtils.AccountExists({ _id: value.account });

        if (!accountExists) {
            if (accountExists) {
                return res.json({
                    status: STATUS_MESSAGES.error,
                    messageId: 400,
                    message: STATUS_MESSAGES.accountExists,
                });
            }
        }
        await AmadUtils.GetAmadNo(value);
        await AmadUtils.GetSerialNumber(value);
        value.balance = value.packet;
        value.lotNo = `${value.amadNo}/${value.packet}`;
        const newAmad = new AmadObj(value);
        const savedAmad = await newAmad.save();

        return res.json({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.saveSuccess,
            data: savedAmad
        });
    } catch (error) {
        return res.json({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.saveError,
        });
    }

};

exports.updateAmad = async (req, res) => {
    try {
        const { error, value } = AmadUtils.ValidateAmad(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        const { account, _id, updatedBy } = value;
        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: "admin" });
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedUpdate,
            });
        }
        const accountExists = await AccountUtils.AccountExists({ _id: account });

        if (!accountExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountExists,
            });
        }
        const existingAmad = await AmadObj.findOne({ _id });

        if (!existingAmad) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound,
            });
        }
        existingAmad.set(value);
        await existingAmad.save();

        return res.json({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.updateSuccess,
        })
    } catch (error) {
        return res.json({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.updateError,
        })
    }
};

exports.deleteAmad = async (req, res) => {
    try {
        const { _id, updatedBy } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: "admin" });
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedDelete,
            });
        }
        const amadToSoftDelete = await AmadObj.findOne({ _id, isDeleted: false });

        if (!amadToSoftDelete) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound
            });
        }

        amadToSoftDelete.isDeleted = true;
        amadToSoftDelete.deletedAt = new Date();
        await amadToSoftDelete.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.recordDeleted
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.deleteError
        });
    }
};

exports.getAmadsList = async (req, res) => {
    try {
        const amadsList = await AmadObj.find({ isDeleted: false });

        const totalCount = await AmadObj.countDocuments();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retriceSuccess,
            data: amadsList,
            totalCount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.deleteError
        });
    }
};

exports.getAmadById = async (req, res) => {
    try {
        const amadId = req.params.id;
        const amad = await AmadObj.findOne({ _id: amadId });

        if (!amad) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: amad
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};

exports.searchAmad = async (req, res) => {
    try {
        const { search } = req.body;
        const trimmedSearch = search ? search.trim() : '';

        let query = {};

        if (trimmedSearch) {
            query = {
                $or: [
                    { accountNumber: trimmedSearch },
                    { amadNo: trimmedSearch },
                    { firstName: { $regex: trimmedSearch, $options: 'i' } },
                    { mobile: { $regex: trimmedSearch, $options: 'i' } },
                    { 'address.village': { $regex: trimmedSearch, $options: 'i' } }
                ]
            };
        }
        const amadsList = await AmadObj.find(query);
        const totalCount = await AmadObj.countDocuments(query);

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: amadsList,
            totalCount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};


