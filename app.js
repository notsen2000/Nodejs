const express = require('express');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'myviews');
app.listen(3000);

app.get('/',
    (req, res) => {
        //res.send('<p>Home Page</p>')
        res.sendFile('./views/index.html', { root: __dirname });
    });

app.get('/about',
    (req, res) => {
        //res.send('<p>about Page</p>')
        res.sendFile('./views/about.html', { root: __dirname });
    });
app.get('/about-us',
    (req, res) => {
        //res.send('<p>about Page</p>')
        res.redirect('/about');
    });

    app.use ((req, res) =>
      {
       // res.status (404).sendFile ('./views/404.html', { root: __dirname });

        res.sendFile ('./views/404.html', { root: __dirname });
    });