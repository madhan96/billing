const pool = require('./index.db');

exports.createProduct = (productdata) => {
    //console.log(productdata);
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PRODUCT SET ?', productdata, (err, result) => {
            if (err) { reject(err); }
            return resolve(result);
        });
    });
};

exports.editProduct = (productId, productdata) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE PRODUCT SET ? WHERE id=?', [productdata, productId], (err, result) => {
            if (err) { reject(err); }
            return resolve(result);
        });
    });
};

exports.deleteProduct = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM PRODUCT WHERE id=?', data, (err, result) => {
            if (err) { reject(err); }
            return resolve(result);
        });
    });
}

exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PRODUCT', (err, res) => {
            if (err) { reject(err); }
            return resolve(res);
        })
    })
}

exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PRODUCT WHERE id=?', id, (err, res) => {
            if (err) { reject(err); }
            return resolve(JSON.parse(JSON.stringify(res)));
        })
    })
}

exports.productExists = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('select exists(select * from product where product_name= ? ) as userexist', username, (err, result) => {
            if (err) { reject(err); }
            return resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}