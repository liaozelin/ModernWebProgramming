const crypto = require('crypto');

const db = require('../model');
const validator = require('../validator');

var post_regist = function(request, response) {
    console.log("POST /regist...");
    var query = request.body;
    db.user.find({
        $or: [{username: query.username}, {studentID: query.studentID}, {email: query.email}, {phone: query.phone}]
    }).exec(function(err, users) { // users为信息重复项
        if (err) return console.error(err);
        // var i = validator.testAll(query);
        if (!validator.testAll(query) || users.length > 0) { // 检查是否所有信息都是格式正确并且没有重复项
            response.json(false);
        } else { // 通过检查,注册用户成功并返回登录页面
            var hash = crypto.createHash('md5');
            db.user.create({
                username: query.username,
                password: hash.update(query.password).digest('hex'),
                studentID: query.studentID,
                email: query.email,
                phone: query.phone
            }, function(err, user) {  // 回调函数,处理信息
                if (err) {
                    console.log("failed: " + err);
                } else {
                    console.log("created: " + JSON.stringify(user));
                    request.session.username = query.username;
                    response.json(true);
                }
            });
        }
    });
}

var post_signin = function(request, response) {
    console.log("POST /signin...");
    var query = request.body;
    var users = db.user.findOne({
        username: query.username
    }).exec(function(err, user) {
        if (err) return console.log("search data from db failed: " + err);

        console.log(`search infomation of user ${query.username}...`);
        var hash = crypto.createHash('md5');
        hash.update(typeof(query.password) === 'string' ? query.password : query.password[0]);
        if (user !== null && user.password === hash.digest('hex')) { // 用户名及密码配对成功
            console.log("succeed: valid username and password");
            request.session.username = query.username;
            response.json(true);
        } else {
            console.log("failed: " + (user === null ? "user doesn't exist" : "password isn't valid"));
            response.json(false);
        }
    });
}

var post_addComment = function(request, response) {
    console.log("POST /addComment...");
    if (!request.session.username) response.json(false);
    var query = request.body;
    var article = db.article.findById(query.id).exec(function(err, article) {
        if (err) return console.log("search data from db failed: " + err);

        if (article != null) {
            var newComment = {
                author: request.session.username,
                content: query.content,
                hidden: false
            };
            article.comments.push(newComment);
            article.save();
            response.json(newComment);
        } else {
            response.json(false);
        }
    });
}

var put_updateComment = function(request, response) {
    console.log("POST /updateComment...");
    if (!request.session.username) response.json(false);
    var query = request.body;
    var article = db.article.findById(query.id).exec(function(err, article) {
        if (err) return console.log("search data from db failed: " + err);

        if (article != null) {
            article.comments[query.index].content = query.content;
            article.save();
            response.json(true);
        } else {
            response.json(false);
        }
    });
}

var put_togglePost = function(request, response) {
    console.log("PUT /togglePost");
    if (!request.session.username) response.json(false);
    var query = request.body;
    var article = db.article.findById(query.id).exec(function(err, article) {
        if (err) return console.log("search data from db failed: " + err);

        if (article != null) {
            article.hidden = !article.hidden;
            article.save();
            response.json(true);
        } else {
            response.json(false);
        }
    });
};

var put_toggleComment = function(request, response) {
    console.log("PUT /toggleComment");
    if (!request.session.username) response.json(false);
    var query = request.body;
    var article = db.article.findById(query.id).exec(function(err, article) {
        if (err) return console.log("search data from db failed: " + err);

        if (article != null) {
            article.comments[query.index].hidden = !article.comments[query.index].hidden;
            article.save();
            response.json(true);
        } else {
            response.json(false);
        }
    });
};

// 处理ajax请求,用于验证信息重复性
var post_ajax = function(request, response) {
    var q = request.body; // 使用了bodyparser后,通过request.body获取post的数据
    console.log(`ajax post, check repitition: ${q.type}: ${q.data}...`);
    var where = {};
    where[q.type] = q.data; // 获取需要验证的信息
    db.user.findOne(where).exec(function(err, items) {
        if (err) return console.log("search data from db failed: " + err);

        var info = (items === null ? 'valid_' : 'invalid_') + q.type;
        console.log('[' + info + ']');
        response.send(info);
    });
}

module.exports = {
    'POST /signin': post_signin,
    'POST /signup': post_regist,
    'POST /addComment': post_addComment,
    'PUT /updateComment': put_updateComment,
    'PUT /togglePost': put_togglePost,
    'PUT /toggleComment': put_toggleComment,
    'POST /ajax': post_ajax
};
