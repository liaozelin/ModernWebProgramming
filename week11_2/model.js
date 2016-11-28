// 自动导入/models中定义的数据类型
const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var db = {};

// 读取并定义models
// var files = readdirSync('./models');
// var js_files = files.filter(function(f) {
//     return f.endsWith('.js');
// });

// for (var f of js_files) {
//     var model = sequelize.import(__dirname + 'models/' + f);
//     db[model.name] = model;
// }
//
fs.readdirSync('./models')
    .filter(function(f) {
        return f.endsWith('.js');
    })
    .forEach(function(f) {
        var model = sequelize.import(__dirname + '/models/' + f);
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sync = () => {
    sequelize.sync().catch(function(err) {
        console.log('failed: ' + err);
    });
};

module.exports = (function() {
    db.sync();
    return db;
})();
