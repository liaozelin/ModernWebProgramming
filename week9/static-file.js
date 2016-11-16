// 导入静态文件
const path = require('path');
const fs = require('mz/fs');
const mime = require('mime');

// 参数:url为指定的路径前缀
// dir为静态文件所在文件夹,后面加上文件名就是正确路径
function staticFile(url, dir) {
    return async (ctx, next) => {
        var rpath = ctx.request.path;  // 请求的文件路径
        if (rpath.startsWith(url)) {
            var file_path = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(file_path)) {
                ctx.response.type = mime.lookup(rpath);  //!
                ctx.response.body = await fs.readFile(file_path);
            } else {  // 文件不存在,返回404状态码
                ctx.response.status = 404;
            }
        } else {  // 不符合前缀,路径错误,执行下一个函数
            await next();
        }
    };
}

module.exports = staticFile;
