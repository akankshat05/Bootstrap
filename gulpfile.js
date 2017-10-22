'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

// this is more code based tast runner
gulp.task('sass', function(){
    return gulp.src('./css/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

/**
* the source files travel through a pipe of functions and finally end up in the destination specified
*/

gulp.task('sass:watch', function(){
    gulp.watch('./css/*.scss', ['sass']);
});
// run the sass task when some css has changed

gulp.task('browser-sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.start('sass:watch');
});
