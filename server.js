const express = require('express');
var moment = require('moment');
const cors = require('cors');
const userrouter = require('./routes/user.routes');
const productrouter = require('./routes/product.route');
const salerouter = require('./routes/sale.route');
const authrouter = require('./routes/auth.routes');
const path = require('path');
const fileUpload = require('express-fileupload')
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
//console.log(process.env);
let time = Date.now();
// console.log(` time=${time} format=${moment(time).format("YYYY-MM-DD HH:mm:ss")}`);
app.use('/users', userrouter);
app.use('/product', productrouter);
app.use('/sale', salerouter);
app.use('/auth', authrouter);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`server started on${port}`);
    console.log(` time=${time} format=${moment(time).format("YYYY-MM-DD HH:mm:ss")}`);
})