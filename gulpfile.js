var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat');

var params = {
    out: 'dist', //
    htmlSrc: 'app/index.html' //Production entry file

};

// Main commands

gulp.task('default', ['watch']);

gulp.task('build', ['sass','lib-fa','fonts']);

gulp.task('prod', ['prod-html', 'prod-css', 'prod-img', 'prod-fonts','prod-lib-fa']);


gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('watch', ['build','server'], function() {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/blocks/**/*.sass','app/blocks/*.sass'], ['sass']);
});

// Builders

gulp.task('sass', function() {
    //Our responsive is mobile first, so default style is main + block-min1200px
    gulp.src('app/blocks/main.sass')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('lib-fa', function(){
    gulp.src(['app/libs/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('app/fonts'));

    gulp.src(['app/libs/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('app/css'));

});


gulp.task('fonts', function() {
    gulp.src(['app/fonts-custom/*.*'])
        .pipe(gulp.dest('app/fonts'));
});


//production commands


gulp.task('prod',['build', 'prod-html', 'prod-css', 'prod-img', 'prod-fonts']);


gulp.task('prod-html', function() {
    gulp.src('app/*.html')
        .pipe(gulp.dest(params.out))
});

gulp.task('prod-css', function() {
    gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('prod-img', function() {
    gulp.src(['app/img/**/*.png','app/img/**/*.gif','app/img/**/*.jpg'])
        .pipe(gulp.dest('dist/img'))
});

gulp.task('prod-fonts', function() {
    gulp.src(['app/fonts/**/*.ttf','app/fonts/**/*.woff','app/fonts/**/*.woff2'])
        .pipe(gulp.dest('dist/fonts'))
});


