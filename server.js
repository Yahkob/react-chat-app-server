"use strict";
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/chatDB';
const port = process.env.PORT || 3000;
const host = !process.env.PORT && 'localhost';
let Hapi = require('hapi');
let routes = require('./routes.js');
let mongoose = require('mongoose');
let Message = require('./models/message.js');

let server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    }
});
server.connection({
    port,
    host
});

server.route(routes);

mongoose.connect(uristring);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

server.start(err => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});