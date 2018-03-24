const gulp = require('gulp');
const stylus = require('gulp-stylus');
const connect = require('gulp-connect');


gulp.task ('stylus',  () => {
  gulp.src('stylus.styl')
      .pipe( stylus() )
      .pipe( gulp.dest('./out/css/') )
      .pipe( connect.reload() );
});

gulp.task('html', () => {
  gulp.src('./out/*.html')
    .pipe(connect.reload());
});

gulp.task('scripts', () => {
  gulp.src('./out/script/*.js')
    .pipe(connect.reload());
});


gulp.task ('watch', () => {
  gulp.watch(['./*.styl'],['stylus']);
  gulp.watch(['./out/*.html'], ['html']);
  gulp.watch(['./out/script/*.js'], ['scripts']);
});

gulp.task('server', () => {
  connect.server({
    root: './out',
    livereload: true
  });
})

gulp.task ('default', ['server', 'watch']);