const express = require('express');
const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

// 指定静态文件目录
app.use(express.static('static'));

// 使用cookie以及session
app.use(cookieParser('lzl'));
// connect方法只能调用一次,createConnection方法可以调用多次!
// connect方法必须调用,否则,connectConnection无法连接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');
var connect = mongoose.createConnection('mongodb://localhost/sessions');
app.use(session({
    secret: 'lzlgreat',
    cookie: {
        maxAge: 604800000 // 24 * 60 * 60 * 1000 //过期时间，一天
    },
    store: new MongoStore({ // 储存方式: mongodb
        db: 'test',
        mongooseConnection: connect
    }),
    resave: true,
    saveUninitialized: true
}));

// 解析post数据: req.body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// 使用nunjucks模板引擎
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

// 处理URL
// controller.js模块自动导入在目录./controllers中定义的url处理函数,
// module.exports为一个函数: 执行后返回路由router
const controller = require('./controller.js');
app.use('/', controller());

app.listen(8000);
console.log("sign in system is running at port 8000...");
