var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    rename      = require('gulp-rename'),
    reload      = browserSync.reload,
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat');

var params = {
    out: 'dist', //
    htmlSrc: 'app/index.html' //Production entry file

};

// Main commands

gulp.task('default', ['server']);

gulp.task('build', ['sass']);

gulp.task('prod', ['prod-html', 'prod-css'])

gulp.task('server', function() {
    browserSync.init({
        server: params.out
    });
    gulp.watch(params.htmlSrc, ['build', 'prod']);
    gulp.watch('app/blocks/**/*.sass', ['build', 'prod']);

});

// Builders

gulp.task('sass', function() {
    //Our responsive is mobile first, so default style is main + block-min1200px
    gulp.src(['app/blocks/*.sass','app/blocks/blocks-min1200px/**/*.sass'])
        .pipe(sass())
        .pipe(concat('min-1200px.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
    // Building min-992px.css:
    gulp.src(['app/blocks/*.sass','app/blocks/blocks-min1200px/**/*.sass','app/blocks/blocks-min992px/**/*.sass'])
        .pipe(sass())
        .pipe(concat('min-992px.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
    // Building min-768px.css:
    gulp.src(['app/blocks/*.sass','app/blocks/blocks-min1200px/**/*.sass','app/blocks/blocks-min992px/**/*.sass','app/blocks/blocks-min768px/**/*.sass'])
        .pipe(sass())
        .pipe(concat('min-768px.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

//production commands


gulp.task('prod-html', function() {
    gulp.src(params.htmlSrc)
        .pipe(rename('index.html'))
        .pipe(gulp.dest(params.out))
        .pipe(reload({stream: true}));
});

gulp.task('prod-css', function() {
    gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});


