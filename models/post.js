var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Guest'},
    post: String
});

module.exports = mongoose.model('Post', postSchema);
