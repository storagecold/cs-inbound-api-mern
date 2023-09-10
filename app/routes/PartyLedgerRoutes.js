const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const partyLedgerController = require("../controllers/PartyLedgerController");

router.post('/partyLedger/', checkAuth, partyLedgerController.getprtyLedger);

module.exports = router;
