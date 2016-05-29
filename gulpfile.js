var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')();


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
});


gulp.task('jade', function () {
  return gulp.src('src/templates/*.jade')
      .pipe($.jade({doctype: 'html'}))
      .pipe(gulp.dest('dist'));
})


gulp.task('sass', function(){
  return gulp.src('src/sass/*.scss')
      .pipe($.sass())
      .pipe(gulp.dest('dist/css'));
});


gulp.task('ls', function () {
  return gulp.src('src/ls/**/*.ls')
      .pipe($.livescript({bare: true}))
      .pipe(gulp.dest('dist/js'));
});


gulp.task('es6', function () {
  return gulp.src('src/es6/**/*.js')
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('dist/js'));
});


gulp.task('inject-reload', ['jade'], function () {
  var injectOptions = {
      addRootSlash: false,
      relative: true
  };

  var injectStyles = gulp.src('dist/css/**/*.css', {read: false});

  var injectScripts = gulp.src(['dist/js/**/*.js', '!dist/js/test/*', '!dist/js/node/*'])
      .pipe($.angularFilesort());

  return gulp.src('dist/**/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});


gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.jade', ['inject-reload']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/ls/**/*.ls', ['ls']);
  gulp.watch('src/**/*.js', ['es6']);

  gulp.watch(['dist/css/**/*.css', 'dist/js/**/*.js'], injectIfNotOnlyChange);
});


gulp.task('default', function(){
  gulp.start('browser-sync', 'sass', 'ls', 'es6', 'inject-reload', 'watch');
});


/*** helpers ***/

function isOnlyChange(event) {
  return event.type === 'changed';
}

function injectIfNotOnlyChange(event) {
  if ( isOnlyChange(event) )
    browserSync.reload();
  else 
    gulp.start('inject-reload');
}
