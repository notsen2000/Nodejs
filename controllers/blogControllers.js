const blog = require('../models/blog');

const blog_index = (req, res) => {
    blog.find().sort({ createdAt: -1 })
        .then((result) => {     
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });     
};


const blog_details = (req, res) => {
    const id = req.params.id;
    console.log('Blog id:', id);    
    blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'Blog Details', blog: result });     
        })
        .catch((err) => {
            res.render  ('404', { title: 'Blog Not Found' });
        });         
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create A New Blog' });
};

const blog_create_post = (req, res) => {
    console.log(req.body);      
    const newBlog = new blog(req.body);
    newBlog.save()
        .then((result) => {                         
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        }); 
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    console.log('Blog id to delete:', id);
    blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });   
        })
        .catch((err) => {
            console.log(err);
        });
};  

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}; 