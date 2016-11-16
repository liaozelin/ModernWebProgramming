// 向response写入登录成功的详情页面
//
const fs = require('fs');

function createHtml(response, setting) {
    console.log("Loading details page...");
    response.write('<!DOCTYPE html> <html> <head> <title>signin-ok</title>');
    response.write('<meta charset="utf-8" />');
    response.write('<link rel="icon" href="http://www.msqq.com/d/file/icon/2014-04-01/172eed482fb88fcbb9918ad438f023de.png" type="image/x-icon">');
    response.write('<link rel="stylesheet" href="/static/css/bootstrap.min.css">');
    response.write('<link rel="stylesheet" href="/static/css/signin.css">')
    response.write('</head> <body>');
    response.write('<div class="container">');
    response.write('<div class="form-signin" role="form" action="/signin" method="post">');
    response.write('<h2 class="form-signin-heading">详情</h2>');
    response.write('用户名:<input type="text" class="form-control username" placeholder="username" required="" autofocus="" name="username" readonly="readonly" value="' + setting.username + '">');
    response.write('学号:<input type="text" class="form-control studentID" placeholder="studentID" name="studentID" readonly="readonly" value="' + setting.studentID + '">');
    response.write('电话:<input type="text" class="form-control phone" placeholder="phone" name="phone" readonly="readonly" value="' + setting.phone + '">');
    response.write('邮箱:<input type="text" class="form-control email" placeholder="email" name="email" readonly="readonly" value="' + setting.email + '">');
    response.write('</div> </div> </body> </html>');
}

module.exports = createHtml;
