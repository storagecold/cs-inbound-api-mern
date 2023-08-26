const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controllers/AccountController");

router.post('/accounts', checkAuth, AccountController.createAccount);
router.put('/accounts', checkAuth, AccountController.updateAccount);
router.delete('/accounts/:accountNumber', checkAuth, AccountController.DeleteAccount);
router.get('/accounts/:accountNumber', checkAuth, AccountController.getAccountByNumber);
router.get('/accounts', checkAuth, AccountController.getAccountsList);
router.post('/accounts', checkAuth, AccountController.searchAccountsList);

module.exports = router;
