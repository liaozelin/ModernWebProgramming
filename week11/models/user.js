// 定义user模型
var userSchema = {
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
};

module.exports = userSchema;
