"use strict";
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/chatDB';
const port = process.env.PORT || 3000;
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let router = express.Router();
let Post = require('./models/post.js');
let bodyParser = require('body-parser');
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.use(bodyParser.json());

app.use('/api', router);

app.use(allowCrossDomain);

mongoose.connect(uristring);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});


router.post('/chat/newMsg', function (req, res) {
    let body = req.body;
    let post = new Post({
        author: body.author,
        post: body.post
    });
    post.save();
    res.end('{"success" : "Posted Successfully", "status" : 200}');
});

router.get('/chat/messages', function (req, res) {
    Post.find({}, function (err, users) {
        if (err) {console.log(err,'hi');}

        res.status(200).send(users);
    });
});


app.listen(port, function () {
    console.log('listening on port: ' + port);
});
