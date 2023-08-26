const express = require("express");
const router = express.Router();

const UserAuthCtrl = require('../controllers/UserController');
const checkAuth = require("../middleware/check-auth");

router.post("/users", UserAuthCtrl.Login);
router.post("/users", UserAuthCtrl.SignUp);
router.post("/users", UserAuthCtrl.ForgotPassword);
router.post("/users", UserAuthCtrl.ResetPassword);

router.patch('/users', checkAuth, UserAuthCtrl.ChangePassword);
router.post("/users", checkAuth, UserAuthCtrl.GetProfile);
router.patch("/users", checkAuth, UserAuthCtrl.UpdateProfile);

module.exports = router;
