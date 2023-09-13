const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controllers/AccountController");

router.post('/accounts', checkAuth, AccountController.createAccount);
router.put('/accounts', checkAuth, AccountController.updateAccount);
router.delete('/accounts/:id', checkAuth, AccountController.deleteAccount);
router.patch('/accounts/:id', checkAuth, AccountController.restoreAccount);
router.get('/accounts/:id', checkAuth, AccountController.getAccountById);
router.get('/accounts/:companyId/:page/:perPage', checkAuth, AccountController.getAccountsList);
router.post('/accounts/search', checkAuth, AccountController.searchAccount);

module.exports = router;
