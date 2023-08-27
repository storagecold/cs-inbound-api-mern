const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AmadController = require("../controllers/AmadController");

router.post('/amads', checkAuth, AmadController.createAmad);
router.put('/amads', checkAuth, AmadController.updateAmad);
router.delete('/amads/:amadNo', checkAuth,AmadController.deleteAmad);
router.get('/amads/:amadNo', checkAuth, AmadController.getAmadByNumber);
router.get('/amads', checkAuth, AmadController.getAmadsList);
router.post('/amads', checkAuth, AmadController.searchAmad);

module.exports = router;
