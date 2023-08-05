const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//invoking function
const app = express();

//connect to database
const dbURL = 'mongodb+srv://yomacorp54:YomaCorp54@pinkblog.a37xlvl.mongodb.net/pink-blogger?retryWrites=true&w=majority';

const client = new MongoClient(dbURL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

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
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.get('/', (req, res) => {
    // console.log(res.statusCode(200));
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: "About"});
});

app.use('/blogs', blogRoutes);

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
