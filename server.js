"use strict";
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/chatDB';
const port = process.env.PORT || 3000;
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let router = express.Router();
let Message = require('./models/message.js');
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/api', router);

mongoose.connect(uristring);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

router.post('/chat/newMsg', (req, res) => {
    let {body: {author, post}} = req;
    let message = new Message({
        author,
        post
    });
    message.save();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        success : 'Posted Successfully',
        status : 200,
        _id: message._id,
        createdOn: message.createdOn
    }));
});

router.get('/chat/messages', (req, res) => {
    Message.find({}, (err, users) => {
        if (err) {console.log(err);}

        res.status(200).send(users);
    });
});


app.listen(port, () => {
    console.log('listening on port: ' + port);
});
