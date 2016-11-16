// 写入初始登录界面
//
const fs = require('fs');

function createHtml(response, message) {
    console.log("Loading sign up page...");
    response.write('<!DOCTYPE html><html>');
    response.write('<head> <title>sign</title>');
    response.write('<meta charset="utf-8" />');
    response.write('<link rel="icon" href="http://www.msqq.com/d/file/icon/2014-04-01/172eed482fb88fcbb9918ad438f023de.png" type="image/x-icon">');
    response.write('<link rel="stylesheet" href="/static/css/bootstrap.min.css">');
    response.write('<link rel="stylesheet" href="/static/css/signin.css">');
    response.write('<link rel="stylesheet" href="/static/css/bootstrap-theme.min.css">');
    response.write('<link rel="stylesheet" href="/static/css/style.css">');
    response.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js"></script>');
    response.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js"></script>');
    response.write('<script type="text/javascript" src="/static/js/signinpage.js"></script>');
    response.write('</head>');
    response.write('<body youdao="bind" cz-shortcut-listen="true">');

    fs.createReadStream('./templates/sign_form.html', 'utf-8').pipe(response);

    if (!message.valid && message.message !== '') {
        response.write('<div class="alert alert-danger" role="alert">');
        response.write('<strong>submit failed: </strong>');
        response.write(`${message.message}`);
        response.write('</div>');
    }

    response.write('</body></html>');
}

module.exports = createHtml;
