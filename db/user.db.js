const pool = require('./index.db');

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM USER', (err, result) => {
            if (err) throw err;
            console.log(result);
            return resolve(result);
        });
    });
};

exports.createUser = (userdata) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO USER SET ?', userdata, (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.getUser = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM USER WHERE user_name=?', username, (err, result) => {
            if (err) throw err;
            console.log(result);
            return resolve(result);
        });
    });
}

exports.editUser = (userId, userdata) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE USER SET ? WHERE user_id=?', [userdata, userId], (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.deleteUser = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM PRODUCT WHERE id=?', data, (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};


exports.editPassword = (details) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE USER SET password_hash= ? WHERE user_id=?', details, (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.userExists = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('select exists(select * from user where user_name= ? ) as userexist', username, (err, result) => {
            if (err) { throw err; }
            return resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}