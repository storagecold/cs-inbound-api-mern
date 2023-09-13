const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const NikasiController = require("../controllers/NikasiController");

router.post('/nikasi', checkAuth, NikasiController.createNikasi);
// router.put('/amads', checkAuth, AmadController.updateAmad);
// router.delete('/amads', checkAuth,AmadController.deleteAmad);
// router.get('/amads/:id', checkAuth, AmadController.getAmadById);
// router.get('/amads', checkAuth, AmadController.getAmadsList);
// router.post('/amads/search', checkAuth, AmadController.searchAmad);

module.exports = router;
