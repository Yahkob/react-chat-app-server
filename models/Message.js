var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Guest'},
    post: String
});

module.exports = mongoose.model('Message', messageSchema);
