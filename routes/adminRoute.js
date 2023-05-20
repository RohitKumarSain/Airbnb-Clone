require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const auth = require('../middleware/auth');

require('../db/connection');
const User = require('../models/users');
const Product = require('../models/listings');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({
    extended: false,
}));
route.use(cookieParser());

//show admin panel for perform curm operation
route.get('/admin/products', auth, (req, res) => {
    const Userdata = req.Userdata;
    if (req.Userdata.userType === 'admin') {
        Product.find({}).sort({ $natural: -1 }).limit(50).exec(function (err, products) {
            res.render('admin/products/index', { products });
        })
    } else {
        req.flash('error', '!User not Authorised ,Please Login As a Admin before accessing admin panel')
        res.redirect('/login')
    }
});

//edit a product
route.get('/admin/products/:id/edit', auth, (req, res) => {
    Product.findById(req.params.id, function (err, product) {
        res.render('admin/products/edit', { product });
    });
});
//edit post route
route.post('/admin/products/:id', auth, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
        if (err) {
            res.render('admin/products/edit', { product, errors: err.errors });
        } else {
            res.redirect('/admin/products');
        }
    });
});

//delete a product
route.get('/admin/products/:id/delete', auth, (req, res) => {
    Product.findByIdAndRemove(req.params.id, function (err) {
        res.redirect('/admin/products');
    });
});

//create a new product
route.get('/admin/products/new', auth, (req, res) => {
    res.render('admin/products/new');

});

route.post('/admin/products', (req, res) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.property_title,
        price: req.body.price,
        address: {
            country: req.body.country,
            market: req.body.market,
            government_area: req.body.government_area,
        },
        images: {
            picture_url: req.body.pictureurl
        },
        description: req.body.description,
        access: req.body.acces,
        property_type: req.body.property_type,
        room_type: req.body.room_type,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        bathrooms: req.body.bathrooms,
        guests_included: req.body.guests_included,
        host: {
            host_name: req.body.host_name
        }
    })

    product.save(function (err) {
        if (err) {
            res.render('admin/products/new', { products, errors: err.errors });
        } else {
            res.redirect('/admin/products');
        }
    });
});

module.exports = route;
