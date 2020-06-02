const pool = require('./index.db');
exports.getPassHash = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT password_hash FROM USER WHERE user_name=?', username, (err, result) => {
            if (err) throw err;
            console.log(result);
            return resolve(result);
        });
    });
}
exports.getUser = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT user_name,is_admin,user_id FROM USER WHERE user_name=?', username, (err, result) => {
            if (err) throw err;
            console.log(result);
            return resolve(result);
        });
    });
}

