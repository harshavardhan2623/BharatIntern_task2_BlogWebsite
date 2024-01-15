const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog-website', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose model for blog posts
const Post = mongoose.model('Post', {
    title: String,
    content: String
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('home.ejs', { posts });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

