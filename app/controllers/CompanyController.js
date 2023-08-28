const CompanyObj = require('../models/Company');
const globalModules = require('../helpers/globalModules');
const Utils = require('../utils/CompanyUtils');
const ComapanyObj = require('../models/Company');
const constantObj = require('../config/Constants')

exports.createCompany = async (req, res) => {
    try {

        const { error, value } = Utils.ComapnyValidate(req.body);
        if (error) {
            return res.jsonp({
                'status': 'error',
                'messageId': 400,
                'message': error.details[0].message,
            });
        }
        value.name = globalModules.firstLetterCapital(value.name);
        // Generate a company code with length 4
        const companyExists = await Utils.CompanyExists(value);
        if (companyExists) {
            return res.jsonp({
                'status': 'error',
                'messageId': 400,
                'message': 'Company with these details already exists.',
            });
        }
        // Create a new CompanyObj instance with the validated data
        const newCompany = new CompanyObj(value);
        const savedCompany = await newCompany.save();
        // Return a success response with the saved company data
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.SuccessRetrievingData,
            'data': savedCompany,
        });
    } catch (error) {
        return res.jsonp({
            'status': 'error',
            'messageId': 500,
            'message': error.message,
        });
    }
};
exports.updateCompany = async (req, res) => {
    try {
        const {name,id } = req.body;
     if(name){
        name = globalModules.firstLetterCapital(name);
     }
     
        const companyExists = await ComapanyObj.findOne({_id:id});
        if (!companyExists) {
            return res.jsonp({
                'status': 'error',
                'messageId': 400,
                'message': 'Company does not exist.',
            });
        }
        companyExists.set(req.body);
        const savedCompany = await companyExists.save();
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.SuccessRetrievingData,
            'data': savedCompany,
        });
    } catch (error) {
        return res.jsonp({
            'status': 'error',
            'messageId': 500,
            'message': error.message,
        });
    }
};
exports.getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await ComapanyObj.findOne({ _id: id });
        if (!company) {
            return res.jsonp({
                'status': 'error',
                'messageId': 404,
                'message': 'Company does not exist.',
            });
        }
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.SuccessRetrievingData,
            'data': company,
        });
    } catch (error) {
        return res.jsonp({
            'status': 'error',
            'messageId': 500,
            'message': error.message,
        });
    }
};
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await ComapanyObj.find({ isDeleted: false });
        const totalCount = await ComapanyObj.countDocuments();
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.SuccessRetrievingData,
            'data': companies,
            'totalRecords': totalCount
        });
    } catch (error) {
        return res.jsonp({
            'status': 'error',
            'messageId': 500,
            'message': error.message,
        });
    }
};
exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const companyToSoftDelete = await ComapanyObj.findOne({ _id: id });
        if (!companyToSoftDelete) {
            return res.jsonp({
                'status': 'error',
                'messageId': 404,
                'message': 'Company does not exist.',
            });
        }
        companyToSoftDelete.isDeleted = true;
        companyToSoftDelete.deletedAt = new Date();
        await companyToSoftDelete.save();
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.RecordDeleted,
        });
    } catch (error) {
        return res.status(500).json({
            'status': 'error',
            'message': 'Error soft-deleting company.'
        });
    }
};
exports.restoreCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const companyToSoftDelete = await ComapanyObj.findOne({ _id: id });
        if (!companyToSoftDelete) {
            return res.jsonp({
                'status': 'error',
                'messageId': 404,
                'message': 'Company does not exist.',
            });
        }
        companyToSoftDelete.isDeleted = false;
        companyToSoftDelete.deletedAt = new Date();
        await companyToSoftDelete.save();
        return res.jsonp({
            'status': 'success',
            'messageId': 200,
            'message': "Comapny" + constantObj.messages.RestorSuccess,
        });
    } catch (error) {
        return res.status(500).json({
            'status': 'error',
            'message': 'Error soft-deleting company.'
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
            'status': 'success',
            'messageId': 200,
            'message': constantObj.messages.SuccessRetrievingData,
            'data': companies,
            'totalRecords': totalCount
        });
    } catch (error) {
        res.status(500).json({
            'status': 'error',
            'message': 'Error fetching company list.'
        });
    }
};
