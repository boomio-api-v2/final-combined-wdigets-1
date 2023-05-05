const gulp = require('gulp');
const watch = require('gulp-watch');
const shell = require('gulp-shell');

gulp.task('webpack', shell.task('npx webpack'));
gulp.task('serve', shell.task('npx http-server'));
gulp.task('watch', function() {
  watch('src/*.js', gulp.series('webpack'));
});

gulp.task('default', gulp.series('webpack', 'serve', 'watch'));
