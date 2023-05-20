require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const auth = require('../middleware/auth')
require('../db/connection');
const User = require('../models/users');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({
    extended: false,
}));
route.use(cookieParser());

//sign up for new user
route.get('/signup', (req, res) => {
    res.render('signup')
});

//save user details in data base,
route.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if (password === confirmpassword) {
            const newUser = new User({
                userType: req.body.UserType,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                dob: req.body.dob,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            //generate jwt token
            const tokon = await newUser.generateAuthToken();

            //set cookies 
            res.cookie("jwt", tokon, {
                //cookies will expires after 15 minutes.
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });
            //save user in database 
            const saveuser = await newUser.save();
            res.redirect('/');

        }

        else {
            res.send('password are not matching')
        }
    } catch (error) {
        req.flash('error', 'User Already registered ! Try again')
        res.redirect('/signup');
    }
})

//login route to show login  form
route.get('/login', async (req, res) => {
    res.render('login');
});

//get data from login form and validate this data usign Jwt token
route.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        //find user in database through emal 
        const useremail = await User.findOne({ email: email });
        //creating a Jwt token for lonin
        const tokon = await useremail.generateAuthToken();
        // console.log(`from log in ${tokon}`)

        //set cookies after login 
        res.cookie("jwt", tokon, {
            //cookies will expires after 15 minutes.
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });
        // console.log("cookies found" + req.cookies.jwt);
        if (useremail.password === password) {
            res.redirect('/')
        }

        else {
            req.flash('error', 'Wrong Password, please try again')
            res.redirect('/login')
        }


    } catch (error) {

        req.flash('error', 'User not registered, please try again')
        res.redirect('/login')
    }
});

route.get('/logout', auth, async (req, res) => {
    try {
        req.Userdata.tokens = [];
        res.clearCookie("jwt")
        await req.Userdata.save();
        res.redirect('/')

    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})
//when user click on book if user already logged in  show bookinn alse ask for login 
route.get('/booking', auth, async (req, res) => {
    //getting user data after login
    const Userdata = req.Userdata;
    res.render('booking', {
        data: Userdata
    })

})
route.get('/hostSucces', auth, async (req, res) => {
    //getting user data after login
    res.render('hostSucces')
})
module.exports = route;
