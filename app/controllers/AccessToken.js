const AccessTokenObj = require("../models/userAuth/AccessToken");
const constantObj = require("./../config/Constants");

// Get Access Token
exports.GetAccessToken = (req, res) => {
  AccessTokenObj.findOne({ accessToken: req.body.accessToken })
    .lean()
    .populate("admin", "role")
    .populate("user", "role company")
    .exec(function (err, result) {
      if (!result || err) {
        return res.jsonp({
          status: "failure",
          messageId: 203,
          message: constantObj.messages.SuccessRetrievingData
        });
      }
      if(result.admin){
        return res.jsonp({
          status: "success",
          messageId: 200,
          message: constantObj.messages.SuccessRetrievingData,
          user: {
            _id: result.admin._id,
            role: result.admin.role
          },
          accessToken: result.accessToken
        });
      } else {
        return res.jsonp({
          status: "success",
          messageId: 200,
          message: constantObj.messages.SuccessRetrievingData,
          user: {
            _id: result.user._id,
            role: result.user.role,
            company: result.user.company
          },
          accessToken: result.accessToken
        });
      }
    })
};