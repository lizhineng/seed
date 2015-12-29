/*!
 * Gulpfile.js for WordPress Starter Theme
 *
 * Author: Li Zhineng <lizhineng@gmail.com>
 * Author URI: http://zhineng.li
 */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true });

var pngquant = require('imagemin-pngquant');
var jpegoptim = require('imagemin-jpegoptim');
var gifsicle = require('imagemin-gifsicle');
var spritesmith = require('gulp.spritesmith');

gulp.task('theme:name', () => {
    gulp.src([
            '**/*.php',
            'src/scss/style.scss',
            '!/**/node_modules{,/**}'
        ])
        // Change the name of the Theme
        .pipe($.replace('WordPress Starter Theme', 'My Theme'))

        // Change the slug of the Theme
        .pipe($.replace('_wst', 'my_theme'))

        .pipe(gulp.dest('.'));
});

gulp.task('clean', () => {
    gulp.src([
            'css', 'img', 'js', 'style*'
        ])
        .pipe($.clean());
});

gulp.task('scss', () => {
    gulp.src('src/scss/style.scss')
        .pipe($.sourcemaps.init())
            .pipe($.sass())
            .pipe($.autoprefixer({
                browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
            }))
        .pipe($.rename({ suffix: '.build' }))
        .pipe(gulp.dest('.'))

        // Minify
        .pipe($.minifyCss())
        .pipe($.rename('style.css'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
});

gulp.task('scripts', () => {
    // Plugins
    gulp.src([
            //'src/vendor/foo/bar.min.js',
        ])
        .pipe($.concat('plugins.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('js'));

    // Functions
    gulp.src('src/js/*.js')
        .pipe($.concat('functions.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('images', () => {
    gulp.src(['src/img/*.{png,jpg,gif}', '!src/img/sprites/{,/**}'])
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), jpegoptim(), gifsicle()]
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('sprites', () => {
    var spriteData = gulp.src('src/img/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss'
        }));

    spriteData.img.pipe(gulp.dest('img'));
    spriteData.css.pipe(gulp.dest('src/scss'));
});

gulp.task('watch', () => {
    gulp.watch('src/scss/style.scss', ['scss']);
});

gulp.task('default', ['clean', 'scss', 'scripts', 'images', 'sprites']);
