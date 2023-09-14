const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const NikasiController = require("../controllers/NikasiController");

router.post('/nikasi', checkAuth, NikasiController.createNikasi);
router.put('/nikasi', checkAuth, NikasiController.updateNikasi);
router.delete('/nikasi', checkAuth, NikasiController.deleteNikasi);
router.get('/nikasi/:id', checkAuth, NikasiController.NikasiById);
router.get('/nikasi', checkAuth, NikasiController.NikasiList);
router.get('/nikasi/list/:accountId/', checkAuth, NikasiController.NikasiByAccount);
router.get('/nikasi/list/:accountId/:amadId', checkAuth, NikasiController.NikasiByAmad);
router.post('/nikasi/search', checkAuth, NikasiController.searchNikasi);

module.exports = router;
