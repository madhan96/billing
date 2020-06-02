const db = require('../db/sales.db');
var moment = require('moment');
const getQueryArray = (products, saleId) => {
    return products.map(product => [product.quantity, product.price_per_unit, product.price, saleId, product.product_id]);
}
exports.createSales = async (req, res) => {
    try {
        const { customer, products, ...sale } = req.body;
        //console.log(products);

        let saleId = await db.createSale({ ...sale, time_of_sale: moment(sale.time_of_sale).format("YYYY-MM-DD HH:mm:ss"), time_created: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") });
        //console.log(`sale finished : ${saleId}`);
        //console.log(getQueryArray(products, saleId));
        await db.createSaleitem(getQueryArray(products, saleId));
        //console.log('saleitem');
        await db.createCustomer({ ...customer, sale_id: saleId });
        //console.log('consumer');
        await db.editQuantity(saleId);
        return res.status('200').json({ message: 'success', saleId: saleId });
    } catch (err) {
        res.status(400).json('error :' + err)
    }
    //.then((saleid) => {
    //     req.body.products.map(saleitem => {
    //         saleitem.sale_id = saleid;
    //         db.createSaleitem(saleitem);
    //     })
    //     return res.status('200').json({ message: 'success' });
    // });
};
exports.getProReports = (req, res) => {
    db.getProductReport(req.body.productName).then((result) => {
        return res.status('200').json({
            message: 'success', report: result.map(({ timeofsale, ...rest }) => {
                return { ...rest, 'timeofsale': moment(timeofsale, moment.DATETIME_LOCAL_MS).format("YYYY-MM-DD HH:mm:ss") }
            })
        });
    }).catch(err => res.status(400).json('error :' + err));
}

exports.getBillReports = (req, res) => {
    // console.log(`${req.body.billDate} 00:00:00`);
    // console.log(`${req.body.lastBillDate} 23:59:59`);
    // console.log(moment("2020-05-30T12:13:13.000Z", moment.DATETIME_LOCAL_MS).format("YYYY-MM-DD HH:mm:ss"))
    db.getBillingReport([`${req.body.billDate} 00:00:00`, `${req.body.lastBillDate} 23:59:59`]).then((result) => {
        return res.status('200').json({
            message: 'success', report: result.map(({ timeofsale, ...rest }) => {
                return { ...rest, 'timeofsale': moment(timeofsale, moment.DATETIME_LOCAL_MS).format("YYYY-MM-DD HH:mm:ss") }
            })
        });
    }).catch(err => res.status(400).json('error :' + err));
}