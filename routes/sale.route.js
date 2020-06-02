const router = require('express').Router();
const sale = require('../controllers/sales.controller');
const auth = require('../controllers/auth.controller')
router.route('/addSale').post(auth.authUser, sale.createSales);
router.route('/getPro').post(auth.authUser, sale.getProReports);
router.route('/getBill').post(auth.authUser, sale.getBillReports);

module.exports = router; 
