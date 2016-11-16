const url = require('url');
const querystring = require('querystring');

const sql_manager = require('../sql_manager');

var get_signin = async(ctx, next) => {
    console.log('get');
    var query = url.parse(ctx.request.url).query;
    var query_info = querystring.parse(query); // 获取请求数据
    var item = sql_manager.userExists(query_info.username); // item为false或者一个{}
    if (item !== false) { // 登录成功
        ctx.render('signin-ok.html', item);
    } else { // 登录失败
        ctx.render('index.html', {
            'valid': true
        });
    }
}

var post_index = async(ctx, next) => {
    console.log('normal post...');
    var pd_json = ctx.request.body;
    sql_manager.addItem(pd_json);
    ctx.render('signin-ok.html', pd_json);
}

var post_ajax = async(ctx, next) => {
    console.log('ajax post...');
    var q = ctx.request.body;  // 使用了koa-bodyparser后,通过ctx.request.body获取post的数据
    if (q.username) {
        if (sql_manager.usernameExists(q.username))
            ctx.response.body = 'invalid_username';
        else
            ctx.response.body = 'valid_username';
    } else if (q.studentID) {
        if (sql_manager.studentIDExists(q.studentID))
            ctx.response.body = 'invalid_studentID';
        else
            ctx.response.body = 'valid_studentID';
    } else if (q.email) {
        if (sql_manager.emailExists(q.email))
            ctx.response.body = 'invalid_email';
        else
            ctx.response.body = 'valid_email';
    } else if (q.phone) {
        if (sql_manager.phoneExists(q.phone))
            ctx.response.body = 'invalid_phone';
        else
            ctx.response.body = 'valid_phone';
    } else {
        ctx.response.body = '';
    }
}

module.exports = {
    'GET /': get_signin,
    'GET /signin': get_signin,
    'POST /signin': post_index,
    'POST /ajax': post_ajax
};
