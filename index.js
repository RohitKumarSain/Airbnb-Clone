const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const mainroute = require('./routes/productRoute')
const loginRoute = require('./routes/loginRoute');
const adminRoute = require('./routes/adminRoute')

const PORT = process.env.PORT || 3000;
const app = express();

//for flash message
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));


app.use(mainroute);
app.use(loginRoute);
app.use(adminRoute);

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/*', (req, res) => {
    res.render('404error')
})
app.listen(PORT, () => {
    console.log(`server started on port:${PORT}`)
})