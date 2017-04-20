var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var zip = require('gulp-zip');
var del = require('del');
var processhtml = require('gulp-processhtml');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var generateIndex = require('./generate-index');
var gulpCopy = require('gulp-copy');
var gulpSequence = require('gulp-sequence');


// Pug Templates
var pug = require('gulp-pug');

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var DIST_PATH = 'dist';
var SRC_PATH = 'src/banner_list';
var ZIP_PATH = 'dist';
var FOLDERS = getFolders(SRC_PATH);

// get banners dirs for process
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

// Static server
gulp.task('server', function() {
    browserSync.init({
        notify: false,
        port: 9000,
        reloadDelay: 1000,
        server: {
            baseDir: DIST_PATH
        }
    });
});

// SASS
gulp.task('sass', function() {

    console.log('>>>> STARTING STYLES TASK 🖌  <<<<');

    var cssTask = FOLDERS.map(function(FOLDERS) {

        return gulp.src(path.join(SRC_PATH, FOLDERS, '/scss/*.scss'))
            .pipe(plumber(function(err) {
                console.log('>>>> STYLES TASK ERROR 💔  <<<<');
                console.log(err);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: ['last 3 versions']
            }))
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(rename("styles.css"))
            .pipe(gulp.dest(DIST_PATH + '/' + FOLDERS + '/css'))
            .pipe(browserSync.stream());
    });

    return (cssTask);
});


// Scripts
gulp.task('scripts', function() {

    console.log('>>>> STARTING SCRIPTS TASK  <<<<');

    var jsTask = FOLDERS.map(function(FOLDERS) {

        return gulp.src(path.join(SRC_PATH, FOLDERS, '/js/*.js'))
            .pipe(plumber(function(err) {
                console.log('SCRIPTS TASK ERROR');
                console.log(err);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(DIST_PATH + '/' + FOLDERS + '/js'))

    });

    return (jsTask);

});

// Images
gulp.task('images', function() {

    console.log('>>>> STARTING IMAGES TASK 🖼  <<<<');

    var imgsTask = FOLDERS.map(function(FOLDERS) {

        return gulp.src(path.join(SRC_PATH, FOLDERS, '/img/*'))
            .pipe(imagemin())
            .pipe(gulp.dest(DIST_PATH + '/' + FOLDERS + '/images'));
    });

    return (imgsTask);
});


// Pug
gulp.task('templates', function() {

    console.log('>>>> STARTING TEMPLATES TASK 📄  <<<<');

    var pugTask = FOLDERS.map(function(FOLDERS) {

        return gulp.src(path.join(SRC_PATH, FOLDERS, '/pug/*.pug'))
            .pipe(pug({
                pretty: false
            }))
            .pipe(rename("index.html"))
            .pipe(gulp.dest(DIST_PATH + '/' + FOLDERS));

    });

    return (pugTask);
})

// Delete dest folder before build
gulp.task('clean', function() {

    console.log('>>>> STARTING DEL TASK ✂️  <<<<');

    return del.sync([
        DIST_PATH
    ]);
});

// Zip banners per folder
gulp.task('zips', function() {

    console.log('>>>> STARTING ZIPS TASK 🗜  <<<<');

    var zipTask = FOLDERS.map(function(FOLDERS) {
        return gulp.src(path.join(ZIP_PATH, FOLDERS, '**/*'))
            .pipe(zip(FOLDERS + '.zip'))
            .pipe(gulp.dest(ZIP_PATH + '/' + 'ZIPS'));

    });

    return (zipTask);
});

// Generate dinamic index.html for banners
gulp.task('processHtml', function() {
    return gulp.src('src/index.html')
        .pipe(processhtml({data:{bannerList: generateIndex()}}))
        .pipe(gulp.dest(DIST_PATH + '/'));
});

// Copy static folder for distribute
gulp.task('copy', function () {
    return gulp.src('src/static/*')
           .pipe(gulpCopy(DIST_PATH + '/', {
            prefix: 1,
           }));
})

// Tasks
gulp.task('build', ['images', 'templates', 'sass', 'scripts', 'processHtml', 'copy'], function() {});

gulp.task('scaffold', ['images', 'templates', 'sass', 'scripts', 'processHtml'], function() {});

gulp.task('watch', ['scaffold', 'server'], function() {

    console.log('>>>> STARTING WATCH TASK 👀  <<<<');

    gulp.watch(SRC_PATH + '/**/scss/*.scss', ['sass', browserSync.reload]);
    gulp.watch(SRC_PATH + '/**/img/*.{png,jpeg,jpg,svg,gif}', ['images', browserSync.reload]);
    gulp.watch(SRC_PATH + '/**/pug/*.pug', ['templates', reload]);
    gulp.watch(SRC_PATH + '/**/js/*.js', ['scripts', browserSync.reload]);
});

gulp.task('default', ['clean'], function() {
    gulp.start('watch');
});

gulp.task('distribute', function(cb) {
  gulpSequence('clean', 'build', function () {
    setTimeout(function (){
        gulp.start('zips');
    }, 4000);
  });
});
