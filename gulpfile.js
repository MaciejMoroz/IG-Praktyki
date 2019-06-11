"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var nunjacksRender = require("gulp-nunjucks-render");

gulp.task("img", function(done) {
  gulp.src("./src/img/**/*").pipe(gulp.dest("./web/img"));
  done();
});

gulp.task("files", function(done) {
  gulp.src("./src/files/**/*").pipe(gulp.dest("./web/files"));
  done();
});

gulp.task("fonts", function(done) {
  gulp.src("./src/fonts/**/*").pipe(gulp.dest("./web/fonts"));
  done();
});

gulp.task("sass", function(done) {
  gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./web/css/"))
    .pipe(browserSync.stream());
  done();
});

gulp.task("js", function(done) {
  gulp.src(["src/js/*"]).pipe(gulp.dest("./web/js/"));
  done();
});

gulp.task("nunjucks", function(done) {
  return gulp
    .src(["src/templates/*.html"])
    .pipe(
      nunjacksRender({
        path: ["src/templates"]
      })
    )
    .pipe(gulp.dest("./web"));
  done();
});

gulp.task(
  "build",
  gulp.series(["img", "fonts", "sass", "nunjucks", "js"], function() {
    browserSync.init({
      server: "./web"
    });
    gulp.watch("src/img/**/*", gulp.parallel(["img"]));
    gulp.watch("src/files/**/*", gulp.parallel(["files"]));

    gulp.watch("src/fonts/**/*", gulp.parallel(["fonts"]));
    gulp.watch("src/scss/**/*.scss", gulp.parallel(["sass"]));
    gulp.watch("scss/**/*.scss", gulp.parallel(["sass"]));
    gulp.watch("src/templates/**/*.html", gulp.parallel(["nunjucks"]));
    gulp.watch("src/js/*.js", gulp.parallel(["js"]));
    gulp.watch("web/*.html").on("change", browserSync.reload);
    gulp.watch("web/js/*.js").on("change", browserSync.reload);
    gulp.watch("web/img/**/*").on("change", browserSync.reload);
    gulp.watch("web/files/**/*").on("change", browserSync.reload);
    gulp.watch("web/fonts/**/*").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series(["build"]));
