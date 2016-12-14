// 定义user模型
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/test');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    studentID: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('user', userSchema);
