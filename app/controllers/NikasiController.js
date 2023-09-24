const AmadObj = require('../models/Amad');
const AccountUtils = require('../utils/AccountUtils');
const NikasiUtils = require('../utils/NikasiUtils');
const NikasiObj = require('../models/Nikasi');
const adminUtils = require('../utils/UserUtils');
const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    NikasiNotFound: 'Nikasi does not exist.',
    accountNotFound: 'Account does not exist.',
    amadNotFound: 'Amad does not exist.',
    NikasiExists: 'Nikasi with these details already exists.', // Updated from 'amadExists'
    saveSuccess: 'Nikasi created successfully.',
    saveError: 'Error saving Nikasi data.',
    updateSuccess: 'Nikasi updated successfully.',
    retrieveSuccess: 'Nikasi retrieved successfully.',
    updateError: 'Error updating Nikasi data.',
    fetchError: 'Error fetching Nikasi.',
    deleteError: 'Error deleting Nikasi.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Nikasi restored successfully.',
    restoreError: 'Error restoring Nikasi.',
    insufficientBalance: "Insufficeient balance",
    userNotAuthorizedUpdate: "Only Admin can update Nikasi.",
    userNotAuthorizedDelete: "Only Admin can delete Nikasi."
};

exports.createNikasi = async (req, res) => {
    try {
        const { error, value } = NikasiUtils.ValidateNikasi(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }

        const accountExists = await AccountUtils.AccountExists({ _id: value.account });
        if (!accountExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountNotFound,
            });
        }
        const amad = await AmadObj.findOne({ _id: value.amad }, { nikasi: 1, balance: 1 });

        if (!amad) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound,
            });
        }

        if (amad.balance < value.packet || amad.balance === 0) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.insufficientBalance,
            });
        }
        let amadData = {
            balance: amad.balance - value.packet,
            nikasi: amad.nikasi + value.packet
        }

        amad.set(amadData)
        await amad.save();

        await NikasiUtils.GetSerialNo(value);

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

exports.updateNikasi = async (req, res) => {
    try {
        const { error, value } = NikasiUtils.ValidateNikasi(req.body);
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
                message: STATUS_MESSAGES.accountNotFound,
            });
        }
        const existingNikasi = await NikasiObj.findOne({ _id });

        if (!existingNikasi) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.NikasiNotFound,
            });
        }
        const amad = await AmadObj.findOne({ _id: value.amad }, { nikasi: 1, balance: 1 });

        if (!amad) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound,
            });
        }
        let amadData = {};
        if (value.packet > existingNikasi.packet) {
            if (amad.balance < value.packet || amad.balance === 0) {
                return res.json({
                    status: STATUS_MESSAGES.error,
                    messageId: 404,
                    message: STATUS_MESSAGES.insufficientBalance,
                });
            }

            amadData = {
                balance: amad.balance - (value.packet - existingNikasi.packet),
                nikasi: amad.nikasi + (value.packet - existingNikasi.packet)
            }
        }
        if (value.packet < existingNikasi.packet) {
            if (amad.balance > value.packet || value.packet < 0) {
                return res.json({
                    status: STATUS_MESSAGES.error,
                    messageId: 404,
                    message: STATUS_MESSAGES.insufficientBalance,
                });
            }
            amadData = {
                balance: amad.balance + (existingNikasi.packet - value.packet),
                nikasi: amad.nikasi - (existingNikasi.packet - value.packet)
            }
        }

        amad.set(amadData)
        await amad.save();

        existingNikasi.set(value);
        await existingNikasi.save();

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

exports.deleteNikasi = async (req, res) => {
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
        const nikasiToSoftDelete = await NikasiObj.findOne({ _id, isDeleted: false }, { packet: 1 });

        if (!nikasiToSoftDelete) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.NikasiNotFound
            });
        }
        const amad = await AmadObj.findOne({ _id: req.body.amad }, { nikasi: 1, balance: 1 });

        if (!amad) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.amadNotFound,
            });
        }
        amadData = {
            balance: amad.balance + nikasiToSoftDelete.packet,
            nikasi: amad.nikasi - nikasiToSoftDelete.packet
        }

        amad.set(amadData)
        await amad.save();

        nikasiToSoftDelete.isDeleted = true;
        nikasiToSoftDelete.deletedAt = new Date();
        await nikasiToSoftDelete.save();

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

exports.NikasiList = async (req, res) => {
    try {
        const amadsList = await NikasiObj.find({ isDeleted: false });

        const totalCount = await NikasiObj.countDocuments();

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
            message: STATUS_MESSAGES.deleteError
        });
    }
};

exports.NikasiById = async (req, res) => {
    try {
        const nikasiId = req.params.id;
        const nikasi = await NikasiObj.findOne({ _id: nikasiId });

        if (!nikasi) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.NikasiNotFound
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: nikasi
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};
exports.NikasiByAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        const data = await NikasiObj.find({ account: accountId });
        const totalCount = await NikasiObj.countDocuments({ account: accountId });
        if (!data) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.NikasiNotFound
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data,
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
exports.NikasiByAmad = async (req, res) => {
    try {
        const { accountId, amadId } = req.params;
        let query = { account: accountId, amad: amadId }
        const data = await NikasiObj.find(query);
        const totalCount = await NikasiObj.countDocuments(query);

        if (!data) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.NikasiNotFound
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data,
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

exports.searchNikasi = async (req, res) => {
    try {
        const { search, amadNo } = req.body;
        const trimmedSearch = search ? search.trim() : '';

        let query = {
            amadNo
        };

        if (trimmedSearch) {
            query = {
                ...query,
                $or: [
                    { 'account.firstName': { $regex: trimmedSearch, $options: 'i' } },
                    { 'account.address.village': { $regex: trimmedSearch, $options: 'i' } }
                ]
            };
        }
        const nikasiList = await NikasiObj.find(query);
        const totalCount = await NikasiObj.countDocuments(query);

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: nikasiList,
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


