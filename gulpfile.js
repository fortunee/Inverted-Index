"use strict";
var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("app", ["serve", "test"]);

gulp.task("serve", function() {
  var browser1 = browserSync.create();
  browser1.init({
    server: {
      baseDir: "./"
    },
    port: 5050,
    ui: {
      port: 9000
    }
  });
  gulp.watch(["*.html", "src/js/*.js", "src/css/*.css"]).on("change", browser1.reload);
});

gulp.task("test", function() {
  var browser2 = browserSync.create();
  browser2.init({
    server: {
      baseDir: "./",
      index: "./SpecRunner.html",
      port: 6060,
      ui: {
        port: 7575
      }
    }
  });
  gulp.watch(["*.html", "src/js/*.js", "spec/*.js"]).on("change", browser2.reload);
});
