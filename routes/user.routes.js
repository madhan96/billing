const router = require('express').Router();
const usercontroller = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');

router.route('get_users').get((req, res) => {
    // User.find().then(users => res.json(users)).catch(err => res.status(400).json('error :' + err));
}
);

router.route('/post_user').post(auth.authUser, (req, res) => usercontroller.addUser(req, res)
);

router.route('/editUser').post(auth.authUser, (req, res) => usercontroller.editUser(req, res)
);

router.route('/getUsers').get(auth.authUser, (req, res) => {
    usercontroller.getUsers(req, res);
});
router.route('/getUser/(:id)').get(auth.authUser, (req, res) => {
    console.log(req.params.id);
    usercontroller.getUser(req, res, req.params.id)
});
router.route('/changePass').post(auth.authUser, usercontroller.changePassword);

router.route('/deleteUser').post(auth.authUser, usercontroller.deleteUser);
module.exports = router;

