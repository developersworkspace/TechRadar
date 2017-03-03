var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');

var serverTS = ["**/*.ts", "!node_modules/**", "!typings/**"];

// Compile typescript files
gulp.task('ts', ['clean'], function() {
    return gulp
        .src(serverTS, {base: './'})
        .pipe(ts({ module: 'commonjs', target:'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./'));
});

// Removes compiled js files
gulp.task('clean', function () {
    return gulp
        .src([
            '**/*.js',
            '**/*.js.map',
            '!node_modules/**',
            '!gulpfile.js'
        ], {read: false})
        .pipe(clean())
});