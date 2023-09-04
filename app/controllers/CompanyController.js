const CompanyObj = require('../models/Company');
const globalModules = require('../helpers/globalModules');
const CompanyUtils = require('../utils/CompanyUtils');
const OrganizationUtils = require('../utils/OrganizationUtils');
const adminUtils = require('../utils/AdminUtils')

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
    organizationNotFound: 'Organization does not exist.',
    userNotAuthorized: 'Only Admin is authorized to Create company',
    userNotAuthorizedUpdate: 'Only Admin is authorized to update company',
    userNotAuthorizedDelete: 'Only Admin is authorized to delete company',
    userNotAuthorizedRestore: 'Only Admin is authorized to restore company'
};

exports.createCompany = async (req, res) => {
    try {
        const { error, value } = CompanyUtils.ComapnyValidate(req.body);

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

        value.name = globalModules.firstLetterCapital(value.name);

        const organizationExists = await OrganizationUtils.OrganizationExists({ _id: value.organization }, res);

        if (!organizationExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.organizationNotFound
            });
        }
        let query = {
            name: value.name,
            email: value.email,
            companyCode: value.companyCode,
            "address.cityVillage": value.address.cityVillage
        }
        const companyExists = await CompanyUtils.CompanyExists(query);
        if (companyExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyExists,
            });
        }
        value.mobile = '+91-' + value.mobile
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
        let { name, id, updatedBy } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedUpdate
            });
        }

        if (name) {
            name = globalModules.firstLetterCapital(name);
        }

        const companyExists = await CompanyObj.findOne({ _id: id });
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
        })
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
        const company = await CompanyObj.findOne({ _id: companyId });

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
        let perPage = Number(req.params.perPage) || 10;
        let page = Number(req.params.page) || 1;
        const companies = await CompanyObj.find({ isDeleted: false })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('updatedBy')
        const totalCount = await CompanyObj.countDocuments();

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
        const { updatedBy, id } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedDelete
            });
        }

        const companyToSoftDelete = await CompanyObj.findOne({ _id: id });

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
        const { updatedBy, _id } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedRestore
            });
        }
        const companyToSoftDelete = await CompanyObj.findOne({ _id });

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

        const companies = await CompanyObj.find(query);
        const totalCount = await CompanyObj.countDocuments(query);

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
