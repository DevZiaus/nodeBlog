const mongoose = require('mongoose');
const Post = require('../models/post');
const {places, descriptors} = require('./seedHelpers');
const chalk = require('chalk');

const PORT = process.env.PORT || 3000;
const databaseURL = 'mongodb://localhost:27017/nodeBlog';

mongoose.connect(databaseURL), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=> {
    console.log(chalk.bgBlue.black("Database Connected"));
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Post.deleteMany({});
    for(let i  = 0; i<25; i++) {
        const post = new Post ( {
            title: `${sample(descriptors)} ${sample(places)}`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl metus, lobortis sit amet massa consequat, commodo consectetur arcu. Duis ac nisl vel nulla varius egestas vel eu elit. Sed porta quam quis felis elementum, eu malesuada libero cursus. Nullam vehicula sed velit nec vehicula. Curabitur vehicula in urna vel iaculis. Sed justo purus, convallis in elit et, tristique ultricies metus. In ut tellus et ligula convallis tempus sit amet lacinia est

            Quisque tristique ligula sed tristique rutrum, arcu orci sollicitudin quam, et pretium sem nulla vel sapien. Maecenas nec diam nibh. Etiam maximus felis elementum urna tempus, vel pulvinar odio aliquam. Aliquam elementum aliquet dolor, et congue diam pulvinar ut. Aliquam a dolor justo. Nulla neque libero, fringilla in nibh at, consequat venenatis nulla. Phasellus gravida turpis id purus lobortis, eget porta magna fringilla. Proin laoreet, ligula sit amet luctus convallis, mauris tortor placerat eros, sed fermentum mauris augue nec diam. Duis porttitor porta auctor. Donec lacinia mattis felis, sit amet eleifend urna dignissim et. In sit amet dolor congue, maximus dui at, congue lacus. Maecenas semper sodales odio, quis tempus nisl hendrerit suscipit. In hac habitasse platea dictumst. Maecenas facilisis eros ac aliquam porttitor. Fusce accumsan porttitor libero, sit amet congue dolor vehicula sit amet`
        });
        await post.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})