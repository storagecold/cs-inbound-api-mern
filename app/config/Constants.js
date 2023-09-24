const globalModules = require("./../helpers/globalModules");


const messages = {
    // AES encryption key
    "SuccessRetrievingData": "Data successfully retreived.",
    "ErrorRetrievingData": "Something went wrong. Please try again.",
    "ErrorSigningUpUser": "Error while signing up user.",
    "UnauthorizedAccessError": "You are not authorized to access. Please contact us at contact@fleetfixy.com",
    "UnauthorizedAction": "You are not authorized to perform this action. Please contact your company admin.",
    "VerificationEmail": "We have sent a verification code to your email address",
    "VerificationPhone": "We have sent a verification code to your mobile phone number.",
    "AddUser": "User has been added successfully.",
    "RestorSuccess": " has been restored successfully.",
    "ForgotPassword": "An email with instructions has been sent to your email address. Follow those instructions to reset your password.",
    "PasswordResetFailed": "Your request does't process. Please try again later.",
    "PasswordResetSuccess": "Your password has been reset successfully.",
    "OldNewPasswordSameError": "Current password and new password can't be same.",
    "OldPasswordIncorrect": "Current password is incorrect.",
    "PasswordChangedSuccess": "Password has been changed successfully.",
    "RecordAdded": "has been created successfully.",
    "RecordUpdated": "has been updated successfully.",
    "RecordDeleted": "has been deleted successfully.",
    "RecordUploaded": "has been uploaded successfully.",
    "RecordDownloaded": "has been downloaded successfully.",
    "ErrorUploading": "# of records could not uploaded. Check your email with details. Please modify those records and upload again.",
    "AlreadyExisted": "already exists.",
    "NotExists": "not exists.",
    "NoRecordFound": "No record found, please check your search query.",
    "CompanyId": "Invalid companyId please check.",
    "NoSearchData": "No search criteria provided",
    "NoComapnyIdData": "Please provide companyId",
}

const newAdminUserJson = {
    email: 'cstechworld@gmail.com',
    password: globalModules.encryptPassword("password"),
    role: 'admin',
};

const errorHandler = (message = constantObj.messages.ErrorRetreivingData) => {
    return {
        status: "failure",
        messageId: 203,
        message: message
    };
};
const colors = {
    chartColors: {
        green: '#4CAF50',
        red: '#F44336',
        blue: '#2196F3'
    }
};

const dateFormats = {
    DATE_TIME_FORMAT_MM_DD_YYYY: "DD-MMM-YYYY hh:mm a",
    DATE_FORMAT_DD_MMM_YYYY: "DD-MMM-YYYY",
    TIME_FORMAT_HH_MM_a: "hh:mm a"
};


const obj = {
    messages: messages,
    colors,
    dateFormats,
    adminJson: newAdminUserJson,
};

module.exports = obj;