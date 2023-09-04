const express = require("express");
const router = express.Router();

const UserAuthCtrl = require('../controllers/UserController');
const checkAuth = require("../middleware/check-auth");

router.post("/users/login", UserAuthCtrl.Login);
router.post("/users/singnup", UserAuthCtrl.SignUp);
router.post("/users/forgetPassword", UserAuthCtrl.ForgotPassword);
router.post("/users/resetpassword", UserAuthCtrl.ResetPassword);

router.patch('/users/changePassword', checkAuth, UserAuthCtrl.ChangePassword);
router.post("/users/getProfile", checkAuth, UserAuthCtrl.GetProfile);
router.patch("/users/updateProfile", checkAuth, UserAuthCtrl.UpdateProfile);

module.exports = router;
