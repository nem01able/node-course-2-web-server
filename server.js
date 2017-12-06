const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

//next exists so you can tell express when your middleware function is done
// The middleware will not moveon until next is called, then the app will continue to run
app.use((req, res, next) => {
    var now = new Date().toString();
    
    var log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use is for middleware while app.get/post...
// middleware is executed from top to bottom, reorder this to the top
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcome: 'Welcome to the home page',
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});