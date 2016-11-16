// 用txt文件'./infomations.txt'模拟数据库
//
const fs = require('fs');

var info = fs.readFileSync('./sql/infomations.txt', 'utf-8') || '';
var data = info === "" ? [] : JSON.parse(info);

// 判断newItem的内容是否重复,返回一个含合法标志valid和信息message的对象
function checkRepetition(newItem) {
    var message = {
        'valid': true,
        'message': ''
    };
    for (var x of data) {
        if (newItem.username === x.username) {
            message.valid = false;
            message.message += `你的用户名 ${newItem.username} 已存在/ `;
        }
        if (newItem.studentID === x.studentID) {
            message.valid = false;
            message.message += `你的学号 ${newItem.studentID} 已存在/ `;
        }
        if (newItem.email === x.email) {
            message.valid = false;
            message.message += `你的邮箱 ${newItem.email} 已存在/ `;
        }
        if (newItem.phone === x.phone) {
            message.valid = false;
            message.message += `你的电话 ${newItem.phone} 已存在/ `;
        }
    }
    return message;
}

// 判断能否成功登录,即item是否已出现在数据库
function signin(item) {
    for (var x of data) {
        if (item.username === x.username && item.studentID === x.studentID && item.email === x.email && item.phone === x.phone)
            return true;
    }
    return false;
}

// 向数据库添加新项,即注册成功
function addItem(newItem) {
    data.push(newItem);
    var ws = fs.createWriteStream('./sql/infomations.txt', 'utf-8');
    ws.write(JSON.stringify(data));
    ws.end();
}

// 判断用户名是否存在,存在返回该对象,不存在返回false
function userExists(username) {
    for (var x of data) {
        if (username === x.username)
            return x;
    }
    return false;
}

function usernameExists(username) {
    for (var x of data) {
        if (username === x.username)
            return true;
    }
    return false;
}
function studentIDExists(studentID) {
    for (var x of data) {
        if (studentID === x.studentID)
            return true;
    }
    return false;
}
function emailExists(email) {
    for (var x of data) {
        if (email === x.email)
            return true;
    }
    return false;
}
function phoneExists(phone) {
    for (var x of data) {
        if (phone === x.phone)
            return true;
    }
    return false;
}

module.exports = {
    'signin': signin,
    'checkRepetition': checkRepetition,
    'addItem': addItem,
    'userExists': userExists,
    'usernameExists': usernameExists,
    'studentIDExists': studentIDExists,
    'emailExists': emailExists,
    'phoneExists': phoneExists
};
