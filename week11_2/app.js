const express = require('express');
const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const session = require('express-session');
var redisStore = require('connect-redis')(session);

const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

// 指定静态文件目录
app.use(express.static('static'));

// 使用cookie以及session
app.use(cookieParser('lzl'));
app.use(session({
    secret: 'lzlgreat',
    cookie: {
        maxAge: 604800000 // 7 * 24 * 60 * 60 * 1000 //过期时间，一周
    },
    store: new redisStore({  // 储存方式: redis
        port: 6379,
        host: '127.0.0.1',
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
// controller.js模块自动导入在目录controllers中定义的url处理函数,
// module.exports为一个函数: 执行后返回路由router
const controller = require('./controller.js');
app.use('/', controller());

app.listen(8000);
console.log("sign in system is running at port 8000...");
