const AmadObj = require('../models/Amad');
const Utils = require('../utils/AmadUtils')
exports.createAmad = async (req, res) => {
    try {
        const { error, value } = Utils.AmadValidate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }
       const amadExists= await Utils.AmadExists(value,res);
        if (amadExists) {
            return res.status(400).json({ status: 'error', message: 'Amad already exists.' });
        }
       await Utils.GetAmadNo(value);
        const newAmad = new AmadObj(value);
        const savedAmad = await newAmad.save();

      res.json({ status: "success", data: savedAmad });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Error saving amad data." });
    }
    
};

exports.updateAmad = async (req, res) => {
    try {
        const { amadNo } = req.body;
        const existingAmad = await AmadObj.findOne({ amadNo });

        if (!existingAmad) {
            return res.status(404).json({ status: 'error', message: 'Amad not found.' });
        }
        existingAmad.set(req.body);
        const updatedAmad = await existingAmad.save();

        res.json({ status: 'success', data: updatedAmad });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating amad data.' });
    }
};

exports.deleteAmad = async (req, res) => {
    try {
        const { amadNo } = req.params;
        const amadToSoftDelete = await AmadObj.findOne({ amadNo },{isDeleted:1});

        if (!amadToSoftDelete) {
            return res.status(404).json({ status: 'error', message: 'Amad not found.' });
        }

        // Mark the account as deleted
        amadToSoftDelete.isDeleted = true;
        amadToSoftDelete.deletedAt = new Date();
        await amadToSoftDelete.save();

        res.json({ status: 'success', message: 'Amad soft-deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error soft-deleting amad.' });
    }
};

exports.getAmadsList = async (req, res) => {
    try {
        const amadsList = await AmadObj.find({ isDeleted: false }).exec();
        ;
        const totalCount = await AmadObj.countDocuments();

        res.json({ status: 'success', data: amadsList, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching amads list.' });
    }
};

exports.getAmadByNumber = async (req, res) => {
    try {
        const { amadNo } = req.params;
        const amad = await AmadObj.findOne({ amadNo});

        if (!amad) {
            return res.status(404).json({ status: 'error', message: 'Amad not found.' });
        }

        res.json({ status: 'success', data: amad });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching amad.' });
    }
};

exports.searchAmad = async (req, res) => {
    try {
        const { search } = req.body;
        const trimmedSearch = search ? search.trim() : '';

        let query = {};

        if (trimmedSearch) {
            query = {
                $or: [
                    { accountNumber: trimmedSearch },
                    { amadNo: trimmedSearch },
                    { firstName: { $regex: trimmedSearch, $options: 'i' } },
                    { mobile: { $regex: trimmedSearch, $options: 'i' } },
                    { 'address.village': { $regex: trimmedSearch, $options: 'i' } }
                ]
            };
        }
        const amadsList = await AmadObj.find(query);
        const totalCount = await AmadObj.countDocuments(query);

        res.json({ status: 'success', data: amadsList, totalCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching amads list.' });
    }
};


