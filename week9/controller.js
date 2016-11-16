const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);  // 例'GET /', 得到请求的路径'/'
            router.get(path, mapping[url]);  // 传入路径与函数
            console.log(`register URL mapping GET ${path}...`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping POST ${path}...`);
        } else {
            console.log(`invalid url ${url}.`);
        }
    }
}

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + '/' + dir);  // 读入目录
    var file = files.filter(function(f) {
        return f.endsWith('.js');  // 筛选出js文件
    });
    for (var f of file) {
        console.log(`Process Controller: ${f}...`);
        var mapping = require(__dirname + '/' + dir + '/' + f);  // 得到完整的路径并导入
        addMapping(router, mapping);
    }
};

module.exports = function() {
    var controllers_dir = 'controllers';
    var router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}
