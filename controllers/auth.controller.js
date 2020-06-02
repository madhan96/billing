const bcrypt = require('bcryptjs');
const db = require('../db/auth.db');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {
    let passHash = await db.getPassHash(req.body.username);
    //console.log(passHash);
    const passString = JSON.parse(JSON.stringify(passHash));
    //console.log(passString[0].password_hash);
    const match = await bcrypt.compare(req.body.password, passString[0].password_hash);
    if (match) {
        let userresult = await db.getUser(req.body.username);
        let user = JSON.parse(JSON.stringify(userresult))[0];
        let expire = Math.floor(Date.now() / 1000) + (60 * 60);
        let IdToken = jwt.sign({
            exp: expire,
            user
        }, process.env.PRIVATE_KEY);
        res.status('200').json({ ...user, expire, IdToken, result: true });
    } else {
        res.sendStatus('401');
    }
}
exports.authUser = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        //console.log(bearerToken);
        try {
            var decoded = jwt.verify(bearerToken, process.env.PRIVATE_KEY);
            next();
        } catch (err) {
            //console.log(err);
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
}