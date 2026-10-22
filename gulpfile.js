const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');

gulp.task('sass', function() {
    return gulp.src('./modules/**/*.scss') // Watch all .scss files in modules directory and its subdirectories
        .pipe(sass())
        .pipe(gulp.dest(function(file) {
            // Get the directory path of the SCSS file
            const directory = path.dirname(file.path);
            return path.dirname(directory) ;
        }));
});

gulp.task('watch', function() {
    gulp.watch('modules/**/*.scss', gulp.series('sass')); // Watch all .scss files in modules directory and its subdirectories
});
