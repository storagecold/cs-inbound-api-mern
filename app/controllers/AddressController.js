const addressObj = require('../models/Address');
const addressUtils = require('../utils/AddressUtils');
const adminUtils = require('../utils/AdminUtils')

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    addressNotFound: 'Address does not exist.',
    addressExists: 'Address with these details already exists.',
    saveError: 'Error saving address data.',
    addSuccess: 'Address added successfully',
    updateSuccess: 'Address updated successfully',
    retrieveSuccess: 'Address retrieved successfully',
    updateError: 'Error updating address data.',
    fetchError: 'Error fetching address.',
    deleteError: 'Error deleting address.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Address restored successfully.',
    restoreError: 'Error restoring address.',
    userNotAuthorized: 'Only Admin is authorized to add address',
    userNotAuthorizedUpdate: 'Only Admin is authorized to update address',
    userNotAuthorizedDelete: 'Only Admin is authorized to delete address',
    userNotAuthorizedRestore: 'Only Admin is authorized to restore address'
};


exports.createAddress = async (req, res) => {
    try {
        const { error, value } = await addressUtils.validateAddress(req.body);

        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message,
            });
        }
        const admin = await adminUtils.isAdmin({ _id: value.createdBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorized
            });
        }

        const foundAddress = await addressUtils.existsAddress(value);
        if (foundAddress) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressExists,
            });
        }
        const newAddress = new addressObj(value);
        const savedAddress = await newAddress.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.addSuccess,
            data: savedAddress,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: error.message,
        });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        let { _id, updatedBy } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' });
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedUpdate
            });
        }
        const addressExists = await addressObj.findOne({ _id });
        if (!addressExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressNotFound,
            });
        }
        addressExists.set(req.body);
        await addressExists.save();
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.updateSuccess
        })
    } catch (error) {
        return res.jsonp({
            status: error,
            messageId: 500,
            message: error.message
        });
    }
};

exports.getAddress = async (req, res) => {
    try {
        const _id = req.params.id;
        const address = await addressObj.findOne({ _id })
        if (!address) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.addressNotFound,
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: address,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError,
        });
    }
};
exports.getAddressList = async (req, res) => {
    try {
        let perPage = Number(req.params.perPage) || 10;
        let page = Number(req.params.page) || 1;

        const address = await addressObj.find({ isDeleted: false })
            .skip((perPage * page) - perPage)
            .limit(perPage);
        const totalCount = await addressObj.countDocuments();
        if (!address) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.addressNotFound,
            });
        }

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: address,
            totalCount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError,
        });
    }
};

exports.deleteAddress = async (req, res) => {
    try {

        let { _id, updatedBy } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' });
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedDelete
            });
        }

        const addressToSoftDelete = await addressObj.deleteOne({ _id });
        if(addressToSoftDelete.deletedCount == 0){
            return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.addressNotFound,
        });
        }
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.recordDeleted,
        });
    } catch (error) {
        return res.status(500).json({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.deleteError
        });
    }
}

exports.searchAddress = async (req, res) => {
    try {
        const { state, district, tehsil, village } = req.body;
        // trimSerach = searchText ? searchText.trim() : '';
        const query = {};

        if (state) {
            query['states.state'] = new RegExp(state, 'i');
        }
        if (district) {
            query['states.districts.district'] = new RegExp(district, 'i');
        }
        if (tehsil) {
            query['states.districts.tehsils.tehsil'] = new RegExp(tehsil, 'i');
        }
        if (village) {
            query['states.districts.tehsils.villages.village'] = new RegExp(village, 'i');
        }

        const addresses = await addressObj.find(query);
        const totalCount = addressObj.count(query)
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            addresses,
            totalCount
        })

    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: error.message
        })
    }
}