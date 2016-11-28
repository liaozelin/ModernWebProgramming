const crypto = require('crypto');

const db = require('../model');
const validator = require('../validator');

var get_index = function(request, response) {
    console.log('GET /...');
    var query = request.query;
    if (request.session !== undefined && request.session.username) {  // 会话存在则直接进入详情页面,否则进入登录页面
        response.redirect(303, '/detail' + request.originalUrl.substring(1));
    } else {
        response.redirect(303, '/signin');
    }
}

var get_detail = function(request, response) {
    console.log("GET /detail...");
    var query = request.query;
    if (request.session.username) {
        db.user.findAll({
            where: {
                username: request.session.username
            }
        }).then(function(users) {
            if (users.length === 0) {  // 用户不存在,回到登录页面
                response.redirect(303, '/signin');
            } else {  // 用户存在,进入详情页面
                var failed = (query.username !== undefined && users[0].dataValues.username !== query.username);
                response.render('detail.html', {
                    user: users[0].dataValues,
                    failed: failed
                });
            }
        }).catch(function(err) {
            console.log("search data from db failed: " + err);
        });
    } else {  // 会话不存在,回到登录页面
        response.redirect(303, '/signin');
    }
}

var get_signin = function(request, response) {
    console.log('GET /signin...');
    if (request.session.username) {
        response.redirect(303, '/detail?username=' + request.session.username);
    } else {
        response.render('signin.html', {});
    }
}

// 退出详情页面,清除会话
var get_quit = function(request, response) {
    console.log("GET /quit...");
    delete request.session.username;
    response.redirect(303, '/signin');
}

var get_regist = function(request, response) {
    console.log("GET /regist...");
    response.render('regist.html', {});
}

var post_regist = function(request, response) {
    console.log("POST /regist...");
    var query = request.body;
    db.user.findAll({
        where: {
            $or: [{
                username: query.username
            }, {
                studentID: query.studentID
            }, {
                email: query.email
            }, {
                phone: query.phone
            }]
        }
    }).then(function(users) {  // users为信息重复项
        if (!validator.testAll(query) || users.length !== 0) { // 检查是否所有信息都是格式正确并且没有重复项
            response.render('/regist', {
                failed: true
            });
        } else {  // 通过检查,注册用户成功并返回登录页面
            var hash = crypto.createHash('md5');
            db.user.create({
                username: query.username,
                password: hash.update(query.password[0]).digest('hex'),
                studentID: query.studentID,
                email: query.email,
                phone: query.phone
            }).then(function(p) {
                console.log("created: " + JSON.stringify(p));
            }).catch(function(err) {
                console.log("failed: " + err);
            });
            response.redirect(303, '/signin');
        }
    }).catch(function(err) {
        console.log("search data from db failed: " + err);
    });
}

var post_signin = function(request, response) {
    console.log("POST /signin...");
    var query = request.body;
    var users = db.user.findAll({
        where: {
            username: query.username
        }
    }).then(function(users) {
        var hash = crypto.createHash('md5');
        hash.update(query.password);
        if (users.length !== 0 && users[0].dataValues.password === hash.digest('hex')) { // 用户名及密码配对成功
            request.session.username = query.username;
            response.redirect(303, '/detail');
        } else {
            response.render('signin.html', {
                failed: true
            });
        }
    }).catch(function(err) {
        console.log("search data from db failed: " + err);
    });
}

// 处理ajax请求,用于验证信息重复性
var post_ajax = function(request, response) {
    var q = request.body; // 使用了bodyparser后,通过request.body获取post的数据
    console.log(`ajax post, check repitition: ${q.type}: ${q.data}...`);
    var where = {};
    where[q.type] = q.data;  // 获取需要验证的信息
    db.user.findAll({
        where: where
    }).then(function(items) {
        var info = (items.length === 0 ? 'valid_' : 'invalid_') + q.type;
        console.log('[' + info + ']');
        response.send(info);
    }).catch(function(err) {
        console.log("search data from db failed: " + err);
    });
}

module.exports = {
    'GET /': get_index,
    'GET /signin': get_signin,
    'GET /regist': get_regist,
    'GET /detail': get_detail,
    'GET /quit': get_quit,
    'POST /signin': post_signin,
    'POST /regist': post_regist,
    'POST /ajax': post_ajax
};
