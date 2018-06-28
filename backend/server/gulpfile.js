const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
    gulp.src('public/scss/app.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({
            includePaths: ['public/scss']
        }))
        .pipe(gulp.dest('public/css'))
});

gulp.task('watch', ['sass'], () => {
    gulp.watch(['public/scss/*.scss'], ['sass']);
});