const crypto = require('crypto');

const db = require('../model');
const validator = require('../validator');

var get_index = function(request, response) {
    console.log('GET /...');
    var query = request.query;
    if (request.session !== undefined && request.session.username) { // 会话存在则直接进入详情页面,否则进入登录页面
        response.redirect(303, '/detail' + request.originalUrl.substring(1));
    } else {
        response.redirect(303, '/signin');
    }
}

var get_detail = function(request, response) {
    console.log("GET /detail...");
    var query = request.query;
    if (request.session.username) {
        db.user.findOne({
            username: request.session.username
        }).exec(function(err, user) {
            if (err) return console.error(err);

            if (user === null) { // 用户不存在,回到登录页面
                response.redirect(303, '/signin');
            } else { // 用户存在,进入详情页面
                var failed = (query.username !== undefined && user.username !== query.username);
                response.render('detail.html', {
                    user: user,
                    failed: failed
                });
            }
        });
    } else { // 会话不存在,回到登录页面
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

module.exports = {
    'GET /': get_index,
    'GET /signin': get_signin,
    'GET /regist': get_regist,
    'GET /detail': get_detail,
    'GET /quit': get_quit
};
