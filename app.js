const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dburl = "mongodb+srv://netninja:Pwd6789@nodetuts.tlmakya.mongodb.net/node-tuts?appName=nodetuts";
 mongoose.connect(dburl)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err)); 

//    mongoose.connect(dburl);

app.set('view engine', 'ejs');
app.set('views', 'myviews');
// app.listen(3000);

app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const now = new Date().toLocaleString();
    const blog = new Blog({ 
        title: `New blog 1 created at ${now}`,
        snippet: `about my new blog created at ${now}`,
        body: `more about my new blog created at ${now}`
    });
    blog.save()
        .then((result) => {
            res.send(result);   
        })
        .catch((err) => {
            console.log(err);
        }); 
});
app.use((req, res,next) => {
    console.log('*************************************');
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    console.log('*************************************');
    next();
}); 
app.use((req, res,next) => {
    console.log('*************************************');
    console.log('In the Middleware');
        console.log('*************************************');
    next();
}); 
app.get('/',
    (req, res) => {
        const blogs = [
            { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
            { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
            { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        ];
        //res.send('<p>Home Page</p>')
        res.render('index', { title: 'Home' , blogs });
    });

app.get('/about',
    (req, res) => {
        //res.send('<p>about Page</p>')
        // res.sendFile('./views/about.html', { root: __dirname });
        res.render('about', { title: 'About' });
    });
app.get('/about-us',
    (req, res) => {
        //res.send('<p>about Page</p>')
        res.redirect('/about', { title: 'About' });
    });


app.get('/blogs/create',
    (req, res) => {
        //res.send('<p>about Page</p>')
        // res.sendFile('./views/about.html', { root: __dirname });
        res.render('create', { title: 'Create A New Blog' });
    });
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });

    //res.sendFile ('./views/404.html', { root: __dirname });
    // res.render('404');

    res.status(404).render('404', { title: '404' });
}); 