const OrganizationObj = require('../models/Organization');
const globalModules = require('../helpers/globalModules');
const Utils = require('../utils/OrganizationUtils');

exports.createOrganization = async (req, res) => {
    try {
        const { error, value } = Utils.OrganizationValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
        value.name = globalModules.firstLetterCapital(value.name);
       const organizationExists= await Utils.OrganizationExists(value,res);
        if (organizationExists) {
            return res.status(400).json({ status: 'error', message: 'Organization with this details already exists.' });
        }
        const newOrganization = new OrganizationObj(value);
        const savedOrganization = await newOrganization.save();

      res.json({ status: "success", data: savedOrganization });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Error saving Organization data." });
    }
    
};

exports.updateOrganization = async (req, res) => {
  try {
      if (req.body.name) {
          req.body.name = globalModules.firstLetterCapital(req.body.name);
      }
      const { id } = req.body;
      const existingOrganization = await OrganizationObj.findOne({ _id:id });

      if (!existingOrganization) {
          return res.status(404).json({ status: 'error', message: 'Organization not found.' });
      }
      existingOrganization.set(req.body);
      await existingOrganization.save();

      res.json({ status: 'success', message: 'Organization updated successfully' })
  } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error updating Organization data.' });
  }
};

exports.getOrganization = async (req, res) => {
  try {
      const organization = await OrganizationObj.find();
      res.json({ status: 'success', data: organization });
  } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error fetching Organization.' });
  }
};