const gulp = require("gulp")
const less = require("gulp-less")
const cleanCSS = require("gulp-clean-css")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const del = require("del")
const clean = () => del(["assets"])
function styles() {
    return gulp.src('./data/less/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/styles'))
}

function babelMainTask() {
    return gulp.src('./data/babel/buttons/*.js')
        .pipe(babel())
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js'))
}

function babelSocketIOTask() {
    return gulp.src('./data/babel/socket/socket.io.js')
        .pipe(concat('socket.io.js'))
        .pipe(gulp.dest('./public/js'))
}

function build(callback) {
    callback()
}

module.exports.build = build
module.exports.less = gulp.series([clean, styles])
module.exports.babel = gulp.series([babelMainTask, babelSocketIOTask])