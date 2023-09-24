const express = require("express");
const router = express.Router();

const userAuthCtrl = require('../controllers/UserController');
const checkAuth = require("../middleware/check-auth");

router.post("/users/login", userAuthCtrl.login);
router.post("/users/signUp", userAuthCtrl.signUp);
router.post("/users/forgetPassword", userAuthCtrl.forgotPassword);
router.post("/users/resetpassword", userAuthCtrl.resetPassword);

router.patch('/users/changePassword', checkAuth, userAuthCtrl.changePassword);
router.post("/users/getProfile", checkAuth, userAuthCtrl.getProfile);
router.patch("/users/updateProfile", checkAuth, userAuthCtrl.updateProfile);

module.exports = router;
