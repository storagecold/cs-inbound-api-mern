const express = require("express");
const router = express.Router();

const UserAuthCtrl = require('./../controllers/UserAuth');
const checkAuth = require("../middleware/check-auth");

router.post("/login", UserAuthCtrl.Login);
router.post("/sign-up", UserAuthCtrl.SignUp);
router.post("/forgot-password", UserAuthCtrl.ForgotPassword);
router.post("/reset-password", UserAuthCtrl.ResetPassword);

router.patch('/change-password', checkAuth, UserAuthCtrl.ChangePassword);
router.post("/get-profile", checkAuth, UserAuthCtrl.GetProfile);
router.patch("/update-profile", checkAuth, UserAuthCtrl.UpdateProfile);

module.exports = router;
