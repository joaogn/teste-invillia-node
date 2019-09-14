const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp.src('dist', { allowEmpty: true }).pipe(clean());
});

gulp.task('compile', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('copy-migration', () => {
  return gulp
    .src('src/database/migrations/*')
    .pipe(gulp.dest('dist/database/migrations'));
});

gulp.task('copy-configuration', () => {
  return gulp.src('src/config/database.js').pipe(gulp.dest('dist/config/'));
});

gulp.task(
  'default',
  gulp.series('clean', 'compile', 'copy-migration', 'copy-configuration')
);
