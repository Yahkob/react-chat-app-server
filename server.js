let express = require('express');
let app = express();
let mongoose = require('mongoose');
let router = express.Router();
let Post = require('./models/post.js');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', router);


mongoose.connect('mongodb://localhost/chatDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});


router.post('/chat/newMsg', function (req, res) {
    let body = req.body;
    let post = Post({
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


app.listen(3000, function () {
    console.log('listening on port 3000');
});
