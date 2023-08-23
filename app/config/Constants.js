const globalModules = require("./../helpers/globalModules");


const messages = {
    // AES encryption key
    "SuccessRetrievingData": "Data successfully retreived.",
    "ErrorRetrievingData": "Something went wrong. Please try again.",
    "UnauthorizedAccessError": "You are not authorized to access. Please contact us at contact@fleetfixy.com",
    "UnauthorizedAction": "You are not authorized to perform this action. Please contact your company admin.",
    "VerificationEmail": "We have sent a verification code to your email address",
    "VerificationPhone": "We have sent a verification code to your mobile phone number.",
    "AddUser": "User has been added successfully.",
    "EmailVerificationSuccess": "Your email has been verified successfully.",
    "PhoneVerificationSucess": "Your mobile phone number has been verified successfully.",
    "EmailExist": "Email address is already associated with an account.",
    "PhoneExist": "Mobile phone number is already associated with an account. Please try login.",
    "EmailDoesnotExist": "Email address doesn't exist. Please provide a registered email.",
    "PhoneDoesnotExist": "Mobile phone number doesn't exist. Please provide a registered mobile phone number.",
    "EmailPasswordError": "Email & Password does't match.",
    "PhonePasswordError": "Mobile phone number & Password does't match.",
    "OtpExpired": "Verification code has been expired.",
    "OtpMismatch": "Verification code doesn't match.",
    "CodeAlreadySent": "Verification code has already been sent.",
    "ForgotPassword": "An email with instructions has been sent to your email address. Follow those instructions to reset your password.",
    "PasswordResetFailed": "Your request does't process. Please try again later.",
    "PasswordResetSuccess": "Your password has been reset successfully.",
    "ProfileUpdated": "Profile updated successfully.",
    "OldNewPasswordSameError": "Current password and new password can't be same.",
    "OldPasswordIncorrect": "Current password is incorrect.",
    "PasswordChangedSuccess": "Password has been changed successfully.",
    "ProfilePicUpdate": "Profile photo updated successfully.",
    "PhotoDeleted": "Photo has been deleted successfully.",
    "RecordAdded": "has been created successfully.",
    "RecordUpdated": "has been updated successfully.",
    "RecordDeleted": "has been deleted successfully.",
    "RecordUploaded": "has been uploaded successfully.",
    "RecordDownloaded": "has been downloaded successfully.",
    "ErrorUploading": "# of records could not uploaded. Check your email with details. Please modify those records and upload again.",
    "AlreadyExisted": "already exists.",
    "NotExists": "not exists.",
    "ConnectedToFleetSpin": "Connected successfully to FleetSpin.",
    "FleetSpinNotConnected": "You are not connected to FleetSpin.",
    "DisconnectedFromFleetSpin": "Disconnected successfully from FleetSpin.",
    "DataSynced": "synced successfully from FleetSpin.",
    "RemovedFromTeam": "has been removed successfully.",
    "AddedToTeam": "has been added successfully.",
    "DeleteCard": "Card has been removed successfully.",
    "UpdateCard": "Card has been updated successfully.",
    "AddCard": "Card has been added successfully.",
    "StartedInspection": "Inspection has been started successfully.",
    "FinishedInspection": "Inspection has been submitted successfully.",
    "NoRecordFound": "No record found, please check your search query.",
    "ResendInviteDriver": "Invitation has been sent successfully.",
    "SendInviteDrivers": "Invitations has been sent successfully.",
    "CommentAddedSuccess": "Your comment has been added successfully.",
    "CreditCard": "Credit card has been added successfully.",
    "CreditCardDelete": "Credit card has been deleted successfully.",
    "WOInvoiceSent": "Work order invoice has been sent successfully.",
    "WoInvoiceDownloaded": "Work order invoice has been downloaded successfully.",
    "CompanyCredits": "Credits has been updated successfully.",
    "UploadDocumentSuccess": "Document uploaded successfully.",
    "DeleteDocumentSuccess": "Document deleted successfully.",
    "AddDocumentSuccess": "Document added successfully.",
    "CompanyId": "Invalid companyId please check.",
    "NoSearchData": "No search criteria provided",
    "NoComapnyIdData": "Please provide companyId",
    "InsufficientQty": "Part quantity is insufficient."
}

const newAdminUserJson = {
    email: 'cstechworld@gmail.com',
    password: globalModules.encryptPassword("password"),
    role: 'admin',
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