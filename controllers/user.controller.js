const bcrypt = require('bcryptjs');
const db = require('../db/user.db');

const saltRounds = 10;



exports.addUser = async (req, res) => {
    try {
        let userArr = await db.userExists(req.body.user_name);
        if (userArr[0].userexist) {
            throw new Error('Username already used');
        }
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {


            db.createUser({
                name: req.body.name,
                user_name: req.body.user_name,
                password_hash: hash,
                is_admin: req.body.is_admin
            }).then((result) => { return res.status('200').json({ message: 'success' }); }).catch(err => { res.status(400).json('error :' + err) });
            // bcrypt.compare('testadmin4', hash).then((ifSame) => {
            //     console.log(ifSame);
            // })
        })
    } catch (error) {
        return res.status(400).json({ message: 'Error', errorMessage: error.message, errorName: 'usedName', name: error.name });
    }

}

exports.getUser = (req, res, username) => {
    db.getUser(username).then((userdetails) => {
        return res.status('200').json({ message: 'success', user: userdetails });
    }).catch(err => res.status(400).json('error :' + err));
};

exports.getUsers = (req, res) => {
    db.getUsers().then((result) => {
        //console.log('the reult is');
        //console.log(result.length);
        return res.status('200').json({ message: 'success', users: result })
    }).catch(err => res.status(400).json('error :' + err));
}

exports.changePassword = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        db.editPassword([hash, req.body.userId]).then(
            (result) => {
                return res.status('200').json({ message: 'success' });
            }
        ).catch(err => res.status(400).json('error :' + err));
    });
}

exports.editUser = (req, res) => {
    const { user_id, ...Data } = req.body;
    if (req.body.password) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            db.editUser(user_id, Data).then((result) => {
                return res.status('200').json({ message: 'success' });
            }).catch(err => res.status(400).json('error :' + err));

        });
    } else {
        db.editUser(user_id, Data).then((result) => {
            return res.status('200').json({ message: 'success' });
        }).catch(err => res.status(400).json('error :' + err));
    }
}

exports.deleteUser = (req, res) => {

    db.deleteUser(req.body.userId).then((result) => {
        return res.status('200').json({ message: 'success' });
    }).catch(err => res.status(400).json('error :' + err));
}
