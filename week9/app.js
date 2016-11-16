const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

var app = new koa();

// 判断当前环境是开发环境还是服务环境(production)
const isProduction = process.env.NODE_ENV === 'production';

// 传入一个异步函数来处理每一个请求
app.use(async (ctx, next) => {
    // console.log("Process is running at port 8000...");
    await next();
});

if (!isProduction) {
    const sf = require('./static-file');
    app.use(sf('/static/', __dirname + '/static')); //
}

app.use(bodyParser());

// 导入模板
const templating = require('./templating');
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

// URL处理
const controller = require('./controller');
app.use(controller());

// start listening at 8000
app.listen(8000);
console.log("Process is running at port 8000...");
