// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');


// Compile typescript files
gulp.task('ts', ['clean'], function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./src'));
});

// Removes compiled js files
gulp.task('clean', function () {
    return gulp
        .src([
            './src/**/*.js',
            './dist'
        ], { read: false })
        .pipe(clean())
});

// Copies 'package.json' file to build directory
gulp.task('build1', ['clean'], function () {
    return gulp
        .src('./package.json')
        .pipe(gulp.dest('./dist'));
});


// Compile typescript files
gulp.task('build', ['build1'], function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./dist'));
});