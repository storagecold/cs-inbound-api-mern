const AmadObj = require('../models/Amad');
const AccountUtils = require('../utils/AccountUtils');
const NikasiUtils = require('../utils/NikasiUtils');
const AmadUtils = require('../utils/AmadUtils');
const NikasiObj = require('../models/Nikasi');
const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    mikasiNotFound: 'Mikasi does not exist.', // Updated from 'amadNotFound'
    accountExists: 'Mikasi does not exist.', // Updated from 'accountExists'
    companyNotFound: 'Company does not exist.',
    addressNotFound: "The address does not exist. Admin, kindly consider adding a new address.",
    mikasiExists: 'Mikasi with these details already exists.', // Updated from 'amadExists'
    saveSuccess: 'Mikasi added successfully.', // Updated from 'saveSuccess'
    saveError: 'Error saving Mikasi data.', // Updated from 'saveError'
    updateSuccess: 'Mikasi updated successfully.', // Updated from 'updateSuccess'
    retrieveSuccess: 'Mikasi retrieved successfully.', // Updated from 'retrieveSuccess'
    updateError: 'Error updating Mikasi data.', // Updated from 'updateError'
    fetchError: 'Error fetching Nikasi.',
    deleteError: 'Error deleting Nikasi.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Nikasi restored successfully.',
    restoreError: 'Error restoring Mikasi.',
    insufficientBalance: "Not sufficeient balance"
};

exports.createNikasi = async (req, res) => {
    try {
        const { error, value } = NikasiUtils.nikasiValidate(req.body);

        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }

        const accountExists = await AccountUtils.AccountExists({ _id: value.account });

        if (!accountExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountExists,
            });
        }

        const amad = await AmadObj.findOne({ _id: value.amad }, { nikasiPktSum: 1, balancePkt: 1 });

        if (!amad) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound,
            });
        }

        if (amad.balancePkt < value.nikasiPkt || amad.balancePkt === 0) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.insufficientBalance,
            });
        }
        let amadData = {
            balancePkt: amad.balancePkt - value.nikasiPkt,
            nikasiPktSum: amad.nikasiPktSum + value.nikasiPkt
        }

        amad.set(amadData)
        await amad.save();

        await NikasiUtils.GetNikasiSrNo(value);

        const nikasi = new NikasiObj(value);
        const data = await nikasi.save();

        return res.json({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.saveSuccess,
            data,
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
        const { error, value } = AmadUtils.AmadValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        const { account, _id } = value;
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
        const { _id } = req.body;
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


