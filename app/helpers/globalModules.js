const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');

module.exports = {
    // Make first letter capital 
    firstLetterCapital: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // Generate random string
    randomString: function (length) {
        let result = '';
        let chars = '123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result + "-" + Date.now().toString();
    },
    // 6 Digit Code
    verificationCode: function () {
        let code = Math.floor(100000 + Math.random() * 900000);
        return code;
    },
    // Generate Password
    generatePassword: function (length) {
        let result = '';
        let chars = '123456789@#abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },
    // Generate Company Code
    generateCode: function (length) {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let pass = "";
        for (let x = 0; x < length; x++) {
            let i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    },
    createJwtToken: function (user) {
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "30d" }
        );
        return token;
    },
    encryptPassword: function (text) {
        let bytes = CryptoJS.AES.encrypt(text, process.env.TOKEN_SECRET);
        let originalText = bytes.toString();
        return originalText;
    },
    decryptPassword: function (text) {
        let bytes = CryptoJS.AES.decrypt(text, process.env.TOKEN_SECRET);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    },
    // Change timezone from UTC timezone to user timezone
    changeToUserZone: function (ts, serverOffset, branchOffset) {
        let newts = parseInt(ts) + (parseInt(branchOffset) - parseInt(serverOffset)) * 60;
        return newts;
    },
};
