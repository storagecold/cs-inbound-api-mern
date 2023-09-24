const UserObj = require("../models/userAuth/User");
const AccessTokenObj = require('../models/userAuth/AccessToken')
const ForgotPasswordObj = require("../models/userAuth/ForgotPassword");

const constantObj = require("../config/Constants");
const globalModules = require("../helpers/globalModules");
const userUtils = require("../utils/UserUtils");
const companyUtils = require("../utils/CompanyUtils");

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    accountNotFound: 'Account does not exist.',
    companyNotFound: 'Company does not exist.',
    addressNotFound: "The address does not exist. Admin, kindly consider adding a new address.",
    accountExists: 'Account with these details already exists.',
    saveSuccess: 'Account added successfully.',
    saveError: 'Error saving Account data.',
    updateSuccess: 'Account updated successfully.',
    retrieveSuccess: 'Account retrieved successfully.',
    updateError: 'Error updating Account data.',
    fetchError: 'Error fetching Account.',
    deleteError: 'Error deleting Account.',
    deleteError: 'Error deleting Account.',
    recordDeleted: 'Record deleted successfully.',
    restoreSuccess: 'Account restored successfully.',
    restoreError: 'Error restoring Account.',
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserObj.findOne({email: email.toLowerCase()});

        if (!user || user.isDeleted) {
            const messageKey = user ? 'UnauthorizedAccessError' : 'EmailPasswordError';
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages[messageKey]
            });
        }

        const decryptedPassword = globalModules.decryptPassword(user.password);

        if (decryptedPassword !== password) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.EmailPasswordError
            });
        }

        const authToken = globalModules.createJwtToken(user);
        const inputJson = {
            user: user._id,
            accessToken: authToken
        };

        const accessToken = new AccessTokenObj(inputJson);
        await accessToken.save();

        return res.jsonp({
            status: "success",
            messageId: 200,
            message: constantObj.messages.SuccessRetrievingData,
            accessToken: authToken,
            user: {
                _id: user._id,
                role: user.role,
                company: user.company
            }
        });
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.ErrorRetrievingData
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const {error, value} = userUtils.userValidate(req.body);
        if (error) {
            return res.jsonp({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: error.details[0].message
            });
        }
        const companyExists = await companyUtils.companyExists({_id: value.company});
        if (!companyExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.companyNotFound,
            });
        }
        const lowercasedEmail = value.email.toLowerCase();
        const encryptedPassword = globalModules.encryptPassword(value.password);
        const formattedFirstName = globalModules.firstLetterCapital(value.firstName);
        const formattedLastName = globalModules.firstLetterCapital(value.lastName);

        const user = {
            ...value,
            email: lowercasedEmail,
            password: encryptedPassword,
            firstName: formattedFirstName,
            lastName: formattedLastName,
        };

        const userModel = new UserObj(user);
        await userModel.save();

        return res.jsonp({
            status: "success",
            messageId: 200,
            message: constantObj.messages.SuccessSignUp
        });
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.ErrorSigningUpUser
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const lowercasedEmail = email.toLowerCase();

        const user = await UserObj.findOne({email: lowercasedEmail});

        if (!user) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.EmailDoesnotExist
            });
        }

        const token = globalModules.createJwtToken(user);
        const today = new Date();
        today.setMinutes(today.getMinutes() + 30);

        const dataExist = await ForgotPasswordObj.findOne({email: user.email});

        if (dataExist) {
            const updateData = {
                token: token,
                expiryTime: today
            };

            await ForgotPasswordObj.updateOne({_id: dataExist._id}, {$set: updateData});

            return res.jsonp({
                status: "success",
                messageId: 200,
                message: constantObj.messages.ForgotPassword
            });
        } else {
            const adding = new ForgotPasswordObj({
                email: user.email,
                token: token,
                expiryTime: today
            });

            await adding.save();

            return res.jsonp({
                status: "success",
                messageId: 200,
                message: constantObj.messages.ForgotPassword
            });
        }
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.ErrorRetrievingData
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const {token, password} = req.body;

        const data = await ForgotPasswordObj.findOne({token});

        if (!data) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.PasswordResetFailed
            });
        }

        await ForgotPasswordObj.deleteOne({_id: data._id});

        const encryptedPassword = globalModules.encryptPassword(password);
        const updateData = {
            password: encryptedPassword
        };

        await UserObj.updateOne({email: data.email}, {$set: updateData});

        return res.jsonp({
            status: "success",
            messageId: 200,
            message: constantObj.messages.PasswordResetSuccess
        });
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.PasswordResetFailed
        });
    }
};

// Change Password API
exports.changePassword = async (req, res) => {
    try {
        const userData = await UserObj.findOne({_id: req.body._id}, {password: 1});

        if (!userData) {
            return res.jsonp({
                status: 'failure',
                messageId: 203,
                message: constantObj.messages.UserNotFound
            });
        }

        const existingPassword = globalModules.decryptPassword(userData.password);

        if (existingPassword === req.body.currentPassword) {
            if (existingPassword === req.body.password) {
                return res.jsonp({
                    status: 'warning',
                    messageId: 203,
                    message: constantObj.messages.OldNewPasswordSameError
                });
            }

            const newPassword = globalModules.encryptPassword(req.body.password);
            const updatePassword = {
                password: newPassword
            };

            await UserObj.updateOne({_id: req.body._id}, {$set: updatePassword});

            return res.jsonp({
                status: 'success',
                messageId: 200,
                message: constantObj.messages.PasswordChangedSuccess
            });
        } else {
            return res.jsonp({
                status: 'failure',
                messageId: 203,
                message: constantObj.messages.OldPasswordIncorrect
            });
        }
    } catch (err) {
        return res.jsonp({
            status: 'failure',
            messageId: 203,
            message: constantObj.messages.ErrorRetrievingData
        });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await UserObj.findOne({_id: req.body._id}).populate('company', 'name companyCode');

        if (!user) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.UserNotFound
            });
        }

        const formattedAddress = {
            addressLine1: user.address.line1 || '',
            addressLine2: user.address.line2 || '',
            city: user.address.city || '',
            state: user.address.state || '',
            zipcode: user.address.zipcode || ''
        };

        const profile = {
            _id: user._id,
            company: {
                name: user.company.name,
                companyCode: user.company.companyCode
            },
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            profilePic: user.profilePic,
            address: formattedAddress
        };

        return res.jsonp({
            status: "success",
            messageId: 200,
            message: constantObj.messages.SuccessRetrievingData,
            user: profile
        });
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.ErrorRetrievingData
        });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        const updated = await UserObj.updateOne({_id: req.body._id}, {$set: req.body});

        if (!updated) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.ErrorRetrievingData
            });
        }
        const user = await UserObj.findOne({_id: req.body._id}).populate('company', 'name').lean().exec();
        if (!user) {
            return res.jsonp({
                status: "failure",
                messageId: 203,
                message: constantObj.messages.ErrorRetrievingData
            });
        }

        const profile = {
            _id: user._id,
            company: {
                name: user.company.name,
            },
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            profilePic: user.profilePic,
            mobile: user.mobile,
            address: {
                addressLine1: user.address.line1 || '',
                addressLine2: user.address.line2 || '',
                city: user.address.city || '',
                state: user.address.state || '',
                country: user.address.country || '',
                zipcode: user.address.zipcode || ''
            }
        };

        return res.jsonp({
            status: "success",
            messageId: 200,
            message: constantObj.messages.ProfileUpdated,
            user: profile
        });
    } catch (err) {
        return res.jsonp({
            status: "failure",
            messageId: 203,
            message: constantObj.messages.ErrorRetrievingData
        });
    }
};
