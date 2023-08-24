const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controllers/AccountController");

router.post('/create', checkAuth, AccountController.createAccount);
router.put('/update', checkAuth, AccountController.updateAccount);
router.delete('/delete/:accountNumber', checkAuth, AccountController.DeleteAccount);
router.get('/get/:accountNumber', checkAuth, AccountController.getAccountByNumber);
router.get('/list', checkAuth, AccountController.getAccountsList);
router.post('/search', checkAuth, AccountController.searchAccountsList);

module.exports = router;
