const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

const index_fn = require('./templates/index');
const signinOK_fn = require('./templates/signin_ok');
const sql_manager = require('./sql_manager');

var server = http.createServer((request, response) => {
    if (request.url.endsWith('.css')) { // return css file
        readFile(request, response, 'css');
    } else if (request.url.endsWith('.js')) { // return js file
        readFile(request, response, 'js');
    } else { // return html file
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        if (request.method === 'GET')
            dealWithGetReq(request, response);
        else if (request.method === 'POST')
            dealWithPostReq(request, response);
    }
});

function readFile(request, response, fileType) {
    console.log(`Loading css file: ${request.url}...`);
    response.writeHead(200, {
        'Content-Type': 'text/' + fileType
    });
    fs.readFile(__dirname + request.url, function(err, data) {
        if (err)
            console.log(err);
        else
            response.write(data);
        response.end();
    });
}

function dealWithGetReq(request, response) {
    var query = url.parse(request.url).query;
    var query_info = querystring.parse(query); // 获取请求数据
    var item = sql_manager.userExists(query_info.username); // item为false或者一个{}
    if (item !== false) { // 登录成功
        signinOK_fn(response, item);
    } else { // 登录失败
        index_fn(response, {
            'valid': true
        });
    }
}

function dealWithPostReq(request, response) {
    var post_data = '';
    request.on('data', function(chunk) {
        post_data += chunk.toString('utf-8');
    });
    request.on('end', function() {
        pd_json = querystring.parse(post_data);
        if (request.headers.accept.startsWith('/ajax'))
            dealWithAjaxReq(request, response, pd_json);
        else
            dealWithNormalReq(request, response, pd_json);
    });
}

function dealWithNormalReq(request, response, pd_json) {
    console.log("Dealing with noraml request...");
    var newItem = {
        'username': pd_json.username,
        'studentID': pd_json.studentID,
        'email': pd_json.email,
        'phone': pd_json.phone
    }
    var message = sql_manager.checkRepetition(newItem);
    if (message.valid) {
        sql_manager.addItem(newItem);
        signinOK_fn(response, newItem);
    } else {
        index_fn(response, message);
    }
}

function dealWithAjaxReq(request, response, pd_json) {
    console.log("Dealing with ajax request...");
    if (pd_json.username !== undefined) {
        if (!sql_manager.usernameExists(pd_json.username))
            response.write('valid_username');
        else
            response.write('invalid_username');
    } else if (pd_json.studentID !== undefined) {
        if (!sql_manager.studentIDExists(pd_json.studentID))
            response.write('valid_studentID');
        else
            response.write('invalid_studentID');
    } else if (pd_json.email !== undefined) {
        if (!sql_manager.emailExists(pd_json.email))
            response.write('valid_email');
        else
            response.write('invalid_email');
    } else if (pd_json.phone !== undefined) {
        if (!sql_manager.phoneExists(pd_json.phone))
            response.write('valid_phone');
        else
            response.write('invalid_phone');
    }
    response.end();
}

server.listen(8000);
console.log("Process is running...");
