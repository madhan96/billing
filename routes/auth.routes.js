const router = require('express').Router();
const authCont = require('../controllers/auth.controller');


router.route('/login').post(authCont.loginUser);

module.exports = router; 