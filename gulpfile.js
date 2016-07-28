var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('html', () => {
	gulp.src('./*.html').
	    pipe(livereload());
});

gulp.task('watch', () => {
	livereload.listen();
	gulp.watch(['./audio.html', './assets/scripts/*.js', './assets/styles/*.css'], ['html']);
});

gulp.task('default', ['watch']);