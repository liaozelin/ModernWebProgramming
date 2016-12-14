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
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping PUT ${path}...`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.delete(path, mapping[url]);
            console.log(`register URL mapping DELETE ${path}...`);
        } else {
            console.log(`invalid url ${url}.`);
        }
    }
}

function addControllers(router, dir) {
    files = fs.readdirSync(__dirname + dir)
                .filter(function(f) {
                    return f.endsWith('.js');
                });
    for (var f of files) {
        console.log(`Loading url controller: ${f}...`);
        var mapping = require(__dirname + dir + f);
        addMapping(router, mapping);
    }
}

module.exports = function(dir) {
    var controllersDir = dir || '/controllers/';
    var router = require('express').Router();
    addControllers(router, controllersDir);
    return router;
}
