const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dburl = "mongodb+srv://netninja:Pwd6789@nodetuts.tlmakya.mongodb.net/node-tuts?appName=nodetuts";
mongoose.connect(dburl)
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

//    mongoose.connect(dburl);

app.set('view engine', 'ejs');
app.set('views', 'myviews');
// app.listen(3000);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());

//mongoose and mongo sandbox routes
/* app.get('/add-blog', (req, res) => {
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

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {     
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        }); 
});

app.get('/single-blog', (req, res) => {
    Blog.findById('694d3574c753f56f95f77db0')
        .then((result) => {     
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        }); 
});  */



app.get('/',
    (req, res) => {
        res.redirect('/blogs');
    });

app.get('/blogs',
    (req, res) => {
        Blog.find().sort({ createdAt: -1 })
            .then((result) => {
                res.render('index', { title: 'All Blogs', blogs: result });
            })
            .catch((err) => {
                console.log(err);
            });
    });


app.post('/blogs', (req, res) => {
    //  res.send('new blog added');
    console.log(req.body);

    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});
app.get('/blogs/create',
    (req, res) => {
        //res.send('<p>about Page</p>')
        // res.sendFile('./views/about.html', { root: __dirname });
        res.render('create', { title: 'Create A New Blog' });
    });
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log('Blog id:', id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log('Blog id to delete:', id);  
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });   
        })
        .catch((err) => {
            console.log(err);
        });
});

//  app.use(morgan('dev'));

/* app.use((req, res, next) => {
    console.log('*************************************');
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    console.log('*************************************');
    next();
});
app.use((req, res, next) => {
    console.log('*************************************');
    console.log('In the Middleware');
    console.log('*************************************');
    next();
}); */
/* app.get('/',
    (req, res) => {
        const blogs = [
            { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
            { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
            { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        ];
        //res.send('<p>Home Page</p>')
        res.render('index', { title: 'Home', blogs });
    }); */

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



/* app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });

    //res.sendFile ('./views/404.html', { root: __dirname });
    // res.render('404');

    res.status(404).render('404', { title: '404' });
});  */

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});