// 数据格式检查器
var validator = {
    username: (x) => /^[a-zA-z][a-zA-z0-9_]{5,17}$/.test(x),
    password: (x) => /^[0-9a-zA-Z\-_]{6,12}$/.test(x),
    studentID: (x) => /^[1-9][0-9]{7}$/.test(x),
    email: (x) => /^[a-zA-z0-9_\-]+@(([a-zA-z_\-])+\.)+[a-zA-z]{2,4}$/.test(x),
    phone: (x) => /^[1-9][0-9]{10}$/.test(x),
    testAll: (item) => (validator.username(item.username) && validator.password(item.password[0]) &&
        validator.studentID(item.studentID) && validator.email(item.email) &&
        validator.phone(item.phone))
};

module.exports = validator;
