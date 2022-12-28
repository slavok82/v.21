
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

function styles() {
    return gulp.src('./styles/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./dist/styles'))
      .pipe(browserSync.stream());      
}

function moveHTML() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))    
}

function moveScripts() {
    return gulp.src('./scripts/*.js')
        .pipe(gulp.dest('./dist/scripts'))    
}

function watchStyles() {
    gulp.watch('./styles/*.scss', styles);
}

function miniJS() {
    return gulp.src('./scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
}

function miniCSS() {
    return gulp.src('./dist/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/styles'))
}

function serveProject() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watchStyles();
}

function concatCSS() {
    return gulp.src('./dist/styles/*.css')
      .pipe(concat('styles.css'))     
      .pipe(gulp.dest('./dist/styles'));
}

exports.styles = styles;  
exports.moveHTML = moveHTML;
exports.moveScripts = moveScripts;
exports.watchStyles = watchStyles;
exports.concatCSS = concatCSS;
exports.miniJS = miniJS;
exports.miniCSS = miniCSS;

exports.startProject = gulp.series(moveHTML, watchStyles);
exports.buildProject = gulp.series(moveHTML, styles);
exports.miniProject = gulp.parallel(miniCSS, miniJS)
exports.serveProject = serveProject;