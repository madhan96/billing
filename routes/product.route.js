const router = require('express').Router();
const pro = require('../controllers/product.controller');
const auth = require('../controllers/auth.controller')


router.route('/addProduct').post(auth.authUser, pro.addProduct);
router.route('/editProduct').post(auth.authUser, pro.editProduct);
router.route('/deleteProduct').post(auth.authUser, pro.deleteProduct);
router.route('/getProducts').get(auth.authUser, pro.getProducts);
module.exports = router;