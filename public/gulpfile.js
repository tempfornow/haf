var gulp = require('gulp'),
    uglify = require('gulp-uglify')
    concat = require('gulp-concat')
    sourcemaps = require('gulp-sourcemaps')

gulp.task('bundle', function() {
  gulp.src(['src/main.js','src/services/*.js','src/controllers/*.js','src/directives/*.js'])
  // .pipe(uglify())
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/dist'))
})


gulp.task('watch', function() {
  gulp.watch(['src/main.js','src/services/*.js','src/controllers/*.js','src/directives/*.js'], ['bundle']);
})
