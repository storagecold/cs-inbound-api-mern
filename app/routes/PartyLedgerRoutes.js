const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const partyLedgerController = require("../controllers/PartyLedgerController");

router.get('/partyLedger/:accountId', checkAuth, partyLedgerController.getprtyLedger);

module.exports = router;
