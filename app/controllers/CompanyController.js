const CompanyObj = require('../models/Company');
const globalModules = require('../helpers/globalModules');
const Utils = require('../utils/CompanyUtils');
const ComapanyObj = require('../models/Company');

exports.createCompany = async (req, res) => {
    try {
        const { error, value } = Utils.ComapnyValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        value.name = globalModules.firstLetterCapital(value.name);
        value.companyCode = globalModules.generateCode(4)
        const companyExists = await Utils.CompanyExists(value);
        if (companyExists) {
            return res.status(400).json({ status: 'error', message: 'company with this details already exists.' });
        }
        const newCompany = new CompanyObj(value);
        const savedCompany = await newCompany.save();

        res.json({ status: "success", data: savedCompany });
    } catch (error) {
        res
            .status(500)
            .json({ status: "error", message: "Error saving Comapny data." });
    }

};
exports.updateCompany = async (req, res) => {
    try {
        const { error, value } = Utils.ComapnyValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        value.name = globalModules.firstLetterCapital(value.name);

        const companyExists = await Utils.CompanyExists(value);

        if (!companyExists) {
            return res.status(404).json({ status: 'error', message: 'Company not found.' });
        }
        companyExists.set(req.body);
        await companyExists.save();

        res.json({ status: 'success', message: 'company updated successfully' })
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating Company data.' });
    }

}
exports.getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await ComapanyObj.findOne({ _id:id });

        if (!company) {
            return res.status(404).json({ status: 'error', message: 'Company not found.' });
        }

        res.json({ status: 'success', data: company });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching company.' });
    }
};
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await ComapanyObj.find({ deleted: false });
        const totalCount = await ComapanyObj.countDocuments();

        res.json({ status: 'success', data: companies, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching companies .' });
    }
};
exports.deleteCompany = async (req, res) => {
    try{
    const { id } = req.params;
    const accountToSoftDelete = await ComapanyObj.findOne({ _id:id });

    if (!companyToSoftDelete) {
        return res.status(404).json({ status: 'error', message: 'Company not found.' });
    }

    // Mark the account as deleted
    accountToSoftDelete.isDeleted = true;
    accountToSoftDelete.deletedAt = new Date();
    await accountToSoftDelete.save();

    res.json({ status: 'success', message: 'Company soft-deleted successfully.' });
} catch (error) {
    res.status(500).json({ status: 'error', message: 'Error soft-deleting company.' });
}
}
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

        res.json({ status: 'success', data: companies, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching company list.' });
    }
};

