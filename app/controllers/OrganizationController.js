const OrganizationObj = require('../models/Organization');
const globalModules = require('../helpers/globalModules');
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
    fetchError: 'Error fetching Organization.'
};

exports.createOrganization = async (req, res) => {
    try {
        const { error, value } = Utils.OrganizationValidate(req.body);
        if (error) {
            return res.status(400).json({ status: STATUS_MESSAGES.error, message: error.details[0].message });
        }
        
        value.name = globalModules.firstLetterCapital(value.name);
        let query = {
            name: value.name,
            email:value.email,
            "address.city": value.address.city
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
        
        const newOrganization = new OrganizationObj(value);
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
        
        if (req.body.name) {
            req.body.name = globalModules.firstLetterCapital(req.body.name);
        }
        
        const existingOrganization = await OrganizationObj.findById(organizationId);
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
        const organization = await OrganizationObj.find();
        return res.jsonp({ status: STATUS_MESSAGES.success, messageId: 200, message:STATUS_MESSAGES.retrieveSuccess, data: organization });
    } catch (error) {
        res.status(500).json({ status: STATUS_MESSAGES.error, message: STATUS_MESSAGES.fetchError });
    }
};
