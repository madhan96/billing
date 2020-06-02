const process = require('process');
const fspromise = require('fs').promises;
const fs = require('fs');
const path = require('path');
const db = require('../db/product.db')

exports.addProduct = async (req, res) => {
    try {
        //console.log(req.body);
        let proArr = await db.productExists(req.body.product_name);
        if (proArr[0].userexist) {
            throw new Error('Product Name already used');
        }
        // console.log(req.files);
        // console.log(`Current directory: ${process.cwd()}`);
        // console.log(path.join(process.cwd(), '/public/images', req.body.name));
        // let v;
        // try {
        //     v = await fspromise.access(path.join(process.cwd(), '/public/images', req.body.name), fs.constants.R_OK);
        // } catch (err) {
        //     v = await fspromise.mkdir(path.join(process.cwd(), '/public/images', req.body.name), { recursive: true });
        // }
        // v = await fspromise.mkdir(path.join(process.cwd(), '/public/images', req.body.name), { recursive: true });
        // console.log(v);
        // await fs.mkdir(path.join(process.cwd(), '/public/images', req.body.name), { recursive: true }, (err) => {
        //     if (err) throw err;
        // });
        if (req.files) {
            let v;
            try {
                v = await fspromise.access(path.join(process.cwd(), '/public/images', req.body.product_name), fs.constants.R_OK);
            } catch (err) {
                v = await fspromise.mkdir(path.join(process.cwd(), '/public/images', req.body.product_name), { recursive: true });
            }
            req.files.image.mv(`public/images/${req.body.product_name}/${req.files.image.name}`).catch((err) => { console.log(err) });

            await db.createProduct({ ...req.body, image: req.files.image.name });
        } else {
            await db.createProduct(req.body);
        }


        res.status('200').json({ message: 'success' });
    } catch (error) {
        return res.status(400).json({ message: 'Error', errorMessage: error.message, errorName: 'usedName', name: error.name });
    }
}

exports.deleteProduct = (req, res) => {
    console.log(req.body);
    db.deleteProduct(req.body.id).then(() => res.status('200').json({ message: 'success' })).catch(err => res.status(400).json('error :' + err));
}

exports.editProduct = async (req, res) => {
    try {
        const { id, ...data } = req.body;

        //db.editProduct(id, data).then(() => res.status('200').json({ message: 'success' }));

        if (req.files) {
            let v;
            try {
                v = await fspromise.access(path.join(process.cwd(), '/public/images', req.body.product_name), fs.constants.R_OK);
            } catch (err) {
                v = await fspromise.mkdir(path.join(process.cwd(), '/public/images', req.body.product_name), { recursive: true });
            }
            req.files.image.mv(`public/images/${req.body.product_name}/${req.files.image.name}`).catch((err) => { console.log(err) });

            await db.editProduct(id, data);
        } else {
            if (req.body.product_name) {
                await fspromise.mkdir(path.join(process.cwd(), '/public/images', req.body.product_name), { recursive: true });
                let product = await db.getProduct(id);
                await fspromise.copyFile(path.join(process.cwd(), '/public/images', product.product_name, product.image), path.join(process.cwd(), '/public/images', req.body.product_name, product.image));
            }
            await db.editProduct(id, data);
        }

        //console.log('here');
        return res.status('200').json({ message: 'success' });
    } catch (err) {
        res.status(400).json('error :' + err)
    }
}

exports.getProducts = (req, res) => {
    db.getProducts().then((result) => res.status('200').json({ data: result })).catch(err => res.status(400).json('error :' + err));
}