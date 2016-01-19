var gulp = require('gulp')
    jade = require('gulp-jade')
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    livescript = require('gulp-livescript'),
    connect = require('gulp-connect');

var rootDir = 'builds';

gulp.task('jade', function(){
  gulp.src('src/templates/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('builds'))
      .pipe(connect.reload());
});

gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('builds/css'))
      .pipe(connect.reload());
});

gulp.task('ls', function () {
  gulp.src('src/ls/**/*.ls')
      .pipe(livescript({bare: true}))
      .pipe(gulp.dest('builds/js'))
      .pipe(connect.reload());
});
gulp.task('coffee', function(){
  gulp.src('src/coffee/**/*.coffee')
      .pipe(coffee({bare: true}))
      .pipe(gulp.dest('builds/js'))
      .pipe(connect.reload());
});

gulp.task('rawjs', function () {
  gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('builds/js'))
      .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    root: [rootDir],
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/ls/**/*.ls', ['ls']);
  gulp.watch('src/coffee/**/*.coffee', ['coffee']);
  gulp.watch('src/js/**/*.js', ['rawjs']);
});

gulp.task('default', function(){
  gulp.start('jade','sass','ls','coffee','rawjs','watch','connect');
});
