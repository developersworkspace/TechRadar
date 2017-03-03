// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var rename = require("gulp-rename");
var sequence = require('run-sequence');

// Compiles typescript files
gulp.task('compile:ts.dev', function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./src'));
});

// Removes compiled js files
gulp.task('clean:js', function () {
    return gulp
        .src([
            './src/**/*.js',
        ], { read: false })
        .pipe(clean())
});


// Removes compiled js files
gulp.task('clean:dist', function () {
    return gulp
        .src([
            './dist'
        ], { read: false })
        .pipe(clean())
});


// Copies 'package.json' file to build directory
gulp.task('copy:package.json', function () {
    return gulp
        .src('./package.json')
        .pipe(gulp.dest('./dist'));
});


// Compiles typescript files
gulp.task('compile:ts.prod', function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./dist'));
});

// Renames config file
gulp.task('rename:config', function () {
    return gulp.src('./dist/config.prod.js', { base: process.cwd() })
        .pipe(rename('config.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build:dev', function (done) {
    sequence('clean:js', 'compile:ts.dev', done);
});

gulp.task('build:prod', function (done) {
    sequence('clean:dist', 'compile:ts.prod', 'copy:package.json', 'rename:config', done);
});