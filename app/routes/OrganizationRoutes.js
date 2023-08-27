const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const OrganizationController = require("../controllers/OrganizationController");

router.post('/organizations', checkAuth, OrganizationController.createOrganization);
router.put('/organizations', checkAuth, OrganizationController.updateOrganization);
router.get('/organizations/', checkAuth, OrganizationController.getOrganization);

module.exports = router;

