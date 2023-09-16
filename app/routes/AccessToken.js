const express = require("express");
const router = express.Router();

const AccessTokenCtrl = require('../controllers/AccessToken');
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, AccessTokenCtrl.GetAccessToken);
module.exports = router;
