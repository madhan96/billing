const pool = require('./index.db');

exports.createSale = (saledata) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO SALE SET ?', saledata, (err, result) => {
            if (err) { throw err; }
            return resolve(result.insertId);
        });
    });
};

exports.createSaleitem = (saleitemdata) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO SALEITEM(quantity,price_per_unit,price,sale_id,product_id) VALUES ?', [saleitemdata], (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.createCustomer = (data) => {
    return new Promise((resolve) => {
        pool.query('INSERT INTO CUSTOMER SET ?', data, (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.editQuantity = (saleId) => {
    return new Promise((resolve) => {
        pool.query(`${query} ?`, saleId, (err, result) => {
            if (err) { throw err; }
            return resolve(result);
        });
    });
};

exports.getProductReport = (proName) => {
    return new Promise((resolve) => {
        pool.query(`${query3}`, proName, (err, result) => {
            if (err) { throw err; }
            return resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}

exports.getBillingReport = (data) => {
    return new Promise((resolve) => {
        pool.query(`${query2}`, data, (err, result) => {
            console.log(result);
            if (err) { throw err; }
            return resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}
const query3 = "SELECT s.id AS billno,s.time_of_sale AS timeofsale,s.sale_amount AS totalbill,sl.price AS price,sl.price_per_unit AS price_per_unit,c.firstName AS customerFirstName,c.lastName AS customerLastName,c.pnum AS customerPhone,c.email AS customerEmail,p.product_name FROM saleitem AS sl INNER JOIN product AS p ON sl.product_id=p.id INNER JOIN sale AS s ON sl.sale_id=s.id INNER JOIN customer AS c ON c.sale_id=sl.sale_id WHERE p.product_name= ?";

const query2 = "SELECT s.id AS billno,s.time_of_sale AS timeofsale,s.sale_amount AS totalbill,c.firstName AS customerFirstName,c.lastName AS customerLastName,c.pnum AS customerPhone,c.email AS customerEmail FROM sale AS s INNER JOIN customer AS c ON s.id=c.sale_id WHERE s.time_of_sale >= ? AND s.time_of_sale <= ?";

const query = "UPDATE product AS p INNER JOIN saleitem AS op ON p.id = op.product_id SET p.in_stock = p.in_stock - op.quantity WHERE op.sale_id =";