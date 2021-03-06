"use strict";
let Message = require('./models/message.js');

module.exports = [
    {
        method: 'POST',
        path: '/api/chat/newMsg',
        handler: (req, res) => {
            let {payload: {author, post}} = req;
            let message = new Message({
                author,
                post
            });
            message.save();
            return res(e => e, JSON.stringify({
                success : 'Posted Successfully',
                status : 200,
                _id: message._id,
                createdOn: message.createdOn
            }));
        }
    },
    {
        method: 'GET',
        path: '/api/chat/messages',
        handler: (req, res) => {
            Message.find({}, (err, users) => {
                if (err) {console.log(err);}
                return res(users);
            });
        }
    }
];