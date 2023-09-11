const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const AmadController = require("../controllers/AmadController");

router.post('/amads', checkAuth, AmadController.createAmad);
router.put('/amads', checkAuth, AmadController.updateAmad);
router.delete('/amads', checkAuth,AmadController.deleteAmad);
router.get('/amads/:id', checkAuth, AmadController.getAmadById);
router.get('/amads', checkAuth, AmadController.getAmadsList);
router.post('/amads/search', checkAuth, AmadController.searchAmad);

module.exports = router;
