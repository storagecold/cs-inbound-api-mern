const CompanyObj = require('../models/Company');
const globalModules = require('../helpers/globalModules');
const Utils = require('../utils/CompanyUtils');
const ComapanyObj = require('../models/Company');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    companyNotFound: 'Company does not exist.',
    companyExists: 'Company with these details already exists.',
    saveError: 'Error saving Company data.',
    updateSuccess: 'Company updated successfully',
    retrieveSuccess: 'Company retrieved successfully',
    updateError: 'Error updating Company data.',
    fetchError: 'Error fetching Company.',
    deleteError: 'Error deleting Company.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Company restored successfully.',
    restoreError: 'Error restoring Company.',
};

exports.createCompany = async (req, res) => {
    try {
        const { error, value } = Utils.ComapnyValidate(req.body);
        
        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message,
            });
        }

        value.name = globalModules.firstLetterCapital(value.name);
        
        const companyExists = await Utils.CompanyExists(value);
        if (companyExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyExists,
            });
        }
        
        const newCompany = new CompanyObj(value);
        const savedCompany = await newCompany.save();
        
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: savedCompany,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: error.message,
        });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        let { name, id } = req.body;
        if (name) {
            name = globalModules.firstLetterCapital(name);
        }

        const companyExists = await ComapanyObj.findOne({ _id: id });
        if (!companyExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        companyExists.set(req.body);
        const savedCompany = await companyExists.save();
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.updateSuccess,
            data: savedCompany,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: error.message,
        });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await ComapanyObj.findOne({ _id: companyId });
        
        if (!company) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: company,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError,
        });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await ComapanyObj.find({ isDeleted: false });
        const totalCount = await ComapanyObj.countDocuments();
        
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data: companies,
            totalRecords: totalCount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageI: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const companyToSoftDelete = await ComapanyObj.findOne({ _id: id });
        
        if (!companyToSoftDelete) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        
        companyToSoftDelete.isDeleted = true;
        companyToSoftDelete.deletedAt = new Date();
        await companyToSoftDelete.save();
        
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
};

exports.restoreCompany = async (req, res) => {
    try {
        const companyId = req.params;
        const companyToSoftDelete = await ComapanyObj.findOne({ _id: companyId });
        
        if (!companyToSoftDelete) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.companyNotFound
            });
        }
        
        companyToSoftDelete.isDeleted = false;
        companyToSoftDelete.deletedAt = new Date();
        await companyToSoftDelete.save();
        
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.recordDeleted,
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageI: 500,
            message: STATUS_MESSAGES.restoreError
        });
    }
};

exports.searchCompany = async (req, res) => {
    try {
        const { search } = req.query;
        const trimmedSearch = search ? search.trim() : '';
        let query = {};
        
        if (trimmedSearch) {
            query = {
                $or: [
                    { companyCode: trimmedSearch },
                    { name: { $regex: trimmedSearch, $options: 'i' } },
                ]
            };
        }
        
        const companies = await ComapanyObj.find(query);
        const totalCount = await ComapanyObj.countDocuments(query);
        
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            dat: companies,
            totalRecords: totalCount
        });
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        });
    }
};
