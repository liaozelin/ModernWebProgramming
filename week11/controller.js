// 自动导入在目录controllers中定义的url处理函数
const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
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

function addControllers(router) {
    files = fs.readdirSync(__dirname + '/controllers/')
                .filter(function(f) {
                    return f.endsWith('.js');
                });
    for (var f of files) {
        console.log(`Loading url controller: ${f}...`);
        var mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function(router) {
    var router = require('express').Router();
    addControllers(router);
    return router;
}
