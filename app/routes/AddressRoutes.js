const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const AddressController = require('../controllers/AddressController');

router.post('/addresses', checkAuth, AddressController.createAddress);
router.put('/addresses', checkAuth, AddressController.updateAddress);
router.get('/addresses/:id', checkAuth, AddressController.getAddress);
router.get('/addresses/:page/:perPage', checkAuth, AddressController.getAllAddress);
router.delete('/addresses', checkAuth, AddressController.deleteAddress);
// router.post('/addresses/search', checkAuth, AddressController.searchAddress);

module.exports = router;
