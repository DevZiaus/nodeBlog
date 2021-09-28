require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path =require('path');
const mongoose = require('mongoose');
const Post = require('./models/post');

console.log(app.get('env'));
console.log(process.env.PORT);
console.log(process.env.DBPORT);


const PORT = process.env.PORT;
const databaseURL = `mongodb://localhost:${process.env.DBPORT}/nodeBlog`;

mongoose.connect(databaseURL), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

const chalk = require('chalk');


const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(middleware);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/createpost', async(req, res) => {
    const post = new Post ({title: 'My first post', body: 'This is my first nodeBlog post. I am very excited about it'});
    await post.save();
    res.send(post)
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=> {
    console.log(chalk.bgBlue.black("Database Connected"));
    app.listen(PORT, ()=> {
        console.log(chalk.bgGreen.black(`Serving the Blog on port ${PORT}`));
    })

});


