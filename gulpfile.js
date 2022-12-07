var gulp = require( 'gulp' ),
    autoprefixer = require( 'autoprefixer' ),
    browserSync  = require( 'browser-sync' ).create(),
    reload  = browserSync.reload,
    sass  = require( 'gulp-sass' ),
    sourcemaps  = require( 'gulp-sourcemaps' ),
    concat  = require( 'gulp-concat' ),
    imagemin  = require( 'gulp-imagemin' ),
    changed = require( 'gulp-changed' ),
    uglify  = require( 'gulp-uglify' ),
    lineec  = require( 'gulp-line-ending-corrector' );
    cache = require('gulp-cache');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const del = require('del');


var scss  = 'app/assets/scss/**/*.scss',
    js  = 'app/assets/js/',
    jsdist  = 'dist/assets/js/',
    Cssdist  = 'dist/assets/css/';

// Watch Files

var HTMLWatchFiles  = 'dist/**/*.html',
    styleWatchFiles  = 'app/assets/scss/**/*.scss';

// Used to concat the files in a specific order.
var jsSRC = [
  js + 'jquery/jquery-3.5.1.js',
  js + 'bootstrap/util.js',
  js + 'bootstrap/tab.js',
  js + 'slick/slick.js',
  js + 'custom.js'
];

var imgSRC =  'app/assets/images/**/*',
    imgDEST = 'dist/assets/images/';

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'dist/assets/css' ]);
}

function css() {
  return gulp.src([scss])
  .pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(lineec())
  .pipe(concat('main.min.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(Cssdist));
}

function javascript() {
  return gulp.src(jsSRC ,{
    sourcemaps: true
})
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(lineec())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsdist));
}

function imgmin() {
  return gulp.src(imgSRC)
  .pipe(changed(imgSRC))
      .pipe( imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
      ]))
      .pipe( gulp.dest(imgDEST));
}

function clearCache() {
  cache.clearAll();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
  gulp.watch(styleWatchFiles,{ delay: 200 }, gulp.series([css]));
  gulp.watch(jsSRC,{ delay: 200 }, javascript);
  gulp.watch(imgSRC, imgmin).on('change', browserSync.reload);
  gulp.watch([HTMLWatchFiles, jsdist + 'app.min.js', scss + 'main.min.css',scss]).on('change', browserSync.reload);
}

exports.clean = clean;
exports.css = css;
exports.javascript = javascript;
exports.watch = watch;
exports.imgmin = imgmin;

const build = gulp.series(clean, gulp.parallel(css,javascript,imgmin,clearCache,watch));

gulp.task(build);
gulp.task('default', build);