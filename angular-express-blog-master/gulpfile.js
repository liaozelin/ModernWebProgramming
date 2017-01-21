var gulp        = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass', 'html', 'nodemon'], function() {

    browserSync.init({
        // server: "./"
        proxy: "localhost:3000/",
        files: ['public/**/*.*', 'views/**/*.*'],
        browser: 'google-chrome',
        notify: false,
        port: 5000
    });

    gulp.watch("public/css/*.css", ['sass']);
    // gulp.watch("views/partials/*.html", ['html']);
    gulp.watch("views/partials/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("public/css/*.css")
        .pipe(reload({stream: true}));
});

gulp.task('html', function() {
    return gulp.src("views/partials/*.html")
        .pipe(reload({stream: true}));
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js',
        ext: 'js html',
        ignore: ["gulpfile.js", "node_modules/"],
        env: {
            'NODE_ENV': 'development'
        }
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            console.log("666");
            cb();
            started = true;
        }
    });
});

gulp.task('default', ['serve']);
