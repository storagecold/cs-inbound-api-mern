const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controllers/AccountController");

router.post('/accounts', checkAuth, AccountController.createAccount);
router.put('/accounts', checkAuth, AccountController.updateAccount);
router.delete('/accounts/:accountNumber', checkAuth, AccountController.deleteAccount);
router.patch('/accounts/:accountNumber', checkAuth, AccountController.restoreAccount);
router.get('/accounts/:accountNumber', checkAuth, AccountController.getAccountByNumber);
router.get('/accounts/:companyId/:page/:perPage', checkAuth, AccountController.getAccountsList);
router.post('/accounts/search', checkAuth, AccountController.searchAccount);

module.exports = router;
