const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controllers/AccountController");

router.post('/create',checkAuth,AccountController)
router.put('/update',checkAuth,AccountController)
router.delete('/delete',checkAuth,AccountController)