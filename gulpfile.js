'use strict';

var browserSync = require('browser-sync').create();
var fs = require('fs');
var gulp = require('gulp');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var data = require('gulp-data');
var path = require('path');

gulp.task('compile', function(done) {
   gulp.src(`./templates/**/*.hbs`)
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./templates/' + path.basename(file.path) + '.json'));
    }))
    .pipe(gulpHandlebars({},{}))
    .pipe(rename(function(path) {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));
    done();
});

gulp.task( 'browser-sync', function() {
  browserSync.init({
    notify: false,
    watch:true,
    "server": './dist'
	});
});


gulp.task('watch', function () {
  gulp.watch([ `./templates/**/*.hbs`,`./templates/**/*.json`],
    gulp.series('compile')
  );
});

gulp.task('watch-bs', gulp.parallel('compile', 'browser-sync', 'watch'));
gulp.task('default', gulp.series('compile'));