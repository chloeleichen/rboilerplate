'use strict';
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    reactify = require('reactify'),
    watch = require('gulp-watch'),
    watchify = require('watchify'),
    sass  = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var path = {
    SRC : './src',
    PUBLIC : './public'
}

//jsx transform task
// use browserify to package js, transform react jsx files, and bundle all together
gulp.task('jsx', function() {
  var b =  browserify({ debug:true });
  b.add(path.SRC+'/js/main.js')
   .transform(reactify)
  return b.bundle()
    .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
    .pipe(source('main.js'))
    .pipe(gulp.dest(path.PUBLIC));
});

//compile sass
gulp.task('sass', function(){
  return sass(path.SRC + '/sass/styles.scss',{
          style: 'expanded',
          loadPath: path.SRC + '/sass'
        })
        .pipe(gulp.dest(path.PUBLIC));
});

//watch js and sass compile 
gulp.task('watch', function(){
  gulp.watch(path.SRC + '/sass/**', ['sass']);
  gulp.watch(path.SRC + '/js/**', ['jsx']);
  gulp.watch([path.SRC + '/js/**', './spec/test.js'], ['test']);
})

//prod task 

// uglify js 
gulp.task('uglify', function(){
  return gulp.src(path.PUBLIC + '/main.js')
         .pipe(uglify())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest(path.PUBLIC));
});

//minify css
gulp.task('minify', function(){
  return gulp.src(path.PUBLIC + '/styles.css')
         .pipe(cssmin())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest(path.PUBLIC));
});

//default dev task

gulp.task('default', ['watch']);

//prod task
//watch js and sass compile 
gulp.task('prod', ['uglify', 'minify']);

//compile task
gulp.task('test', function() {
  var b =  browserify({ debug:true });
  b.add('./spec/test.js')
   .transform(reactify)
  return b.bundle()
    .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
    .pipe(source('spec.js'))
    .pipe(gulp.dest('spec'));
});







