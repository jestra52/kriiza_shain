var gulp = require('gulp'),
nodemon = require('gulp-nodemon'),
plumber = require('gulp-plumber'),
livereload = require('gulp-livereload');

gulp.task('develop', function () {
    livereload.listen();
    nodemon({
        script: 'app.js',
        ext: 'js coffee ejs',
        stdout: false
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/^App running on http:\/\//.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', [
    'develop'
]);
