const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const companyController = require('../controllers/CompanyController');

router.post('/companies', checkAuth, companyController.createCompany);
router.put('/companies', checkAuth, companyController.updateCompany);
router.get('/companies/:id', checkAuth, companyController.getCompany);
router.get('/companies/:page/:perPage', checkAuth, companyController.getAllCompanies);
router.delete('/companies', checkAuth, companyController.deleteCompany);
router.patch('/companies', checkAuth, companyController.restoreCompany);
router.post('/companies/search', checkAuth, companyController.searchCompany);

module.exports = router;
