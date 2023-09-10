const CompanyObj = require('../models/Company');
const globalModules = require('../helpers/globalModules');
const CompanyUtils = require('../utils/CompanyUtils');
const OrganizationUtils = require('../utils/OrganizationUtils');
const addressUtils = require('../utils/AddressUtils');
const adminUtils = require('../utils/AdminUtils');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    companyNotFound: 'Company does not exist.',
    addressNotFound: "The address not exist. Admin, kindly consider adding a new address.",
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
        let { name, email, companyCode, organization, address, createdBy } = value
        name = globalModules.firstLetterCapital(name);

        let query = {
            state: address.state,
            district: address.district,
            tehsil: address.tehsil,
            village: address.village
        }
        const existAddress = await addressUtils.existsAddress(query);
        if (!existAddress) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressNotFound
            });
        }
        const admin = await adminUtils.isAdmin({ _id: createdBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorized
            });
        }

        const organizationExists = await OrganizationUtils.OrganizationExists({ _id: organization }, res);

        if (!organizationExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.organizationNotFound
            });
        }
        let companyQuery = { name, email, companyCode }

        const companyExists = await CompanyUtils.CompanyExists(companyQuery);

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
        const { error, value } = CompanyUtils.ComapnyValidate(req.body);

        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message,
            });
        }
        let { name, _id, updatedBy, address } = value;

        name = globalModules.firstLetterCapital(name);

        let query = {
            state: address.state,
            district: address.district,
            tehsil: address.tehsil,
            village: address.village
        }

        const existAddress = await addressUtils.existsAddress(query);
        if (!existAddress) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.addressNotFound
            });
        }

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' });
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedUpdate
            });
        }

        const companyExists = await CompanyObj.findOne({ _id });
        if (!companyExists) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        companyExists.set(value);
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
        const company = await CompanyObj.findOne({ _id: companyId, isDeleted: false });

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
        const { updatedBy, _id } = req.body;

        const admin = await adminUtils.isAdmin({ _id: updatedBy, role: 'admin' })
        if (!admin) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.userNotAuthorizedDelete
            });
        }

        const companyToSoftDelete = await CompanyObj.findOne({ _id, isDeleted: false });

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
        const restoreCompany = await CompanyObj.findOne({ _id, isDeleted: true });

        if (!restoreCompany) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 404,
                message: STATUS_MESSAGES.companyNotFound
            });
        }

        restoreCompany.isDeleted = false;
        restoreCompany.deletedAt = new Date();
        await restoreCompany.save();

        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.restoreSuccess,
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
        const { search } = req.body;
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
