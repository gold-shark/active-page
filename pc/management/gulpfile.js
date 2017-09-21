var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require("gulp-minify-css");

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
  return gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['minify-css']);