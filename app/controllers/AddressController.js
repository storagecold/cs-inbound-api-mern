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
