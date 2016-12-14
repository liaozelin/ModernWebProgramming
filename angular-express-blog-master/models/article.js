const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/test');

// var commentSchema = new mongoose.Schema({
//     author: {
//         type: String,
//         unique: true
//     },
//     content: String
// });

var articleSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    comments: [{author: String, content: String, hidden: Boolean}],
    hidden: Boolean
});

// articleSchema.static.getOne = function(_id, callback) {
//     return this.findOne({'_id': _id}, callback);
// }
var articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
