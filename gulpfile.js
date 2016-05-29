var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    livescript = require('gulp-livescript');


gulp.task('jade', function(){
  gulp.src('src/templates/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('builds'));
});

gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('builds/css'));
});

gulp.task('ls', function () {
  gulp.src('src/ls/**/*.ls')
      .pipe(livescript({bare: true}))
      .pipe(gulp.dest('builds/js'));
});

gulp.task('rawjs', function () {
  gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('builds/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/ls/**/*.ls', ['ls']);
  gulp.watch('src/js/**/*.js', ['rawjs']);
});

gulp.task('default', function(){
  gulp.start('jade','sass','ls','rawjs','watch');
});
