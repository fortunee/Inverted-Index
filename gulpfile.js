'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('sync', function () {

  browserSync.init({
    server: "./"
  });
  gulp.watch(["*.html", 'src/js*.js', 'src/css/*.css' ]).on('change', browserSync.reload);

});
