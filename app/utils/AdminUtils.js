const UserObj = require('../models/userAuth/User')

module.exports = {
    isAdmin : async function (query) {
        return await UserObj.findOne(query,{ role: 1 });
    },
}