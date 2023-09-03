const organizationObj = require('../models/Organization');
const globalModules = require('../helpers/globalModules');
const adminUtils = require('../utils/AdminUtils')
const Utils = require('../utils/OrganizationUtils');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    organizationNotFound: 'Organization does not exist.',
    organizationExists: 'Organization with this details already exists.',
    saveError: 'Error saving Organization data.',
    updateSuccess: 'Organization updated successfully',
    retrieveSuccess: 'Organization updated successfully',
    updateError: 'Error updating Organization data.',
    fetchError: 'Error fetching Organization.',
    userNotAuthorized:'Only Admin is authorized to Create Organozation',
    userNotAuthorizedUpdate:'Only Admin is authorized to update Organozation'
};

exports.createOrganization = async (req, res) => {
    try {
        const { error, value } = Utils.OrganizationValidate(req.body);
        if (error) {
            return res.status(400).json({ status: STATUS_MESSAGES.error, message: error.details[0].message });
        }
        const admin = await adminUtils.isAdmin({ _id: value.createdBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorized
            });
        }
        value.name = globalModules.firstLetterCapital(value.name);
        let query = {
            name: value.name,
            email: value.email,
            "address.cityVillage": value.address.cityVillage
        }
        const organizationExists = await Utils.OrganizationExists(query, res);
        if (organizationExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.organizationExists
            });
        }
        value.mobile = '+91-' + value.mobile;

        const newOrganization = new organizationObj(value);
        const savedOrganization = await newOrganization.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            data: savedOrganization
        });
    } catch (error) {
        res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.saveError
        });
    }
};

exports.updateOrganization = async (req, res) => {
    try {
        const organizationId = req.body.id;

        const admin = await adminUtils.isAdmin({ _id: req.body.updatedBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedUpdate
            });
        }
        if (req.body.name) {
            req.body.name = globalModules.firstLetterCapital(req.body.name);
        }

        const existingOrganization = await organizationObj.findById(organizationId);
        if (!existingOrganization) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.organizationNotFound
            });
        }

        existingOrganization.set(req.body);
        const updatedOrganization = await existingOrganization.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.updateSuccess,
            data: updatedOrganization
        });
    } catch (error) {
        res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.updateError
        });
    }
};
exports.getOrganization = async (req, res) => {
    try {
        const organization = await organizationObj.find();
        return res.jsonp({ status: STATUS_MESSAGES.success, messageId: 200, message: STATUS_MESSAGES.retrieveSuccess, data: organization });
    } catch (error) {
        res.status(500).json({ status: STATUS_MESSAGES.error, message: STATUS_MESSAGES.fetchError });
    }
};

