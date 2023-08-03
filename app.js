const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//invoking function
const app = express();

//connect to database
const dbURL = 'mongodb+srv://yomacorp54:YomaCorp54@pinkblog.a37xlvl.mongodb.net/pink-blogger?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engines
app.set('view engine', 'ejs');

//listen for requests
// app.listen(3000);

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'Barbie Blog',
//         snippet: 'About Barbie',
//         body: 'The Barbie movie just came out'
//     });

//     blog.save()
//         .then((result) => {res.send(result)})
//         .catch((err) => {console.log(err);});
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {res.send(result)})
//         .catch((err) => {console.log(err);});
// });

// app.get('/single-blog', (req, res)=> {
//     Blog.findById('64cb274e2aa747feff9639f1')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {console.log(err);});

// })
 
// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('mathod: ', req.method);
//     next(); 
// })

//middleware and static files



app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: "About"});
});

app.get('/blogs'), (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: "Create a new blog"})
})
//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 fires regardless, so it works like a switch case or match in rust
app.use((req, res) => {
    // res.sendFile('./views/404.html', {root: __dirname});
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: "404"});
});
