'use strict';

/**
 * Import node modules
 */
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var uglify       = require('gulp-uglify');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');
var browserSync  = require('browser-sync');

var dir = {
  src: 'src',
  dist: 'dist',
};

/**
 * Build CSS
 */
gulp.task('css', function() {
  return gulp.src(dir.src + '/*.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dir.dist))
    .pipe(postcss([
      cssnano({
        'zindex': false
      })
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dir.dist))
});

/**
 * Build javascript
 */
gulp.task('js', function() {
  return gulp.src(dir.src + '/**/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      input: dir.src + '/jquery.background-parallax-scroll.js',
      format: 'iife',
      external: ['jquery'],
      globals: {
        jquery: "jQuery"
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: [
            [
              "env", {
                "modules": false,
                "targets": {
                  "browsers": ['last 2 versions']
                }
              }
            ]
          ],
          plugins: ['external-helpers'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist))
    .on('end', function() {
      gulp.src([dir.dist + '/jquery.background-parallax-scroll.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist));
    });
});

/**
 * Sample page
 */
gulp.task('html', function() {
  return gulp.src(dir.src + '/*.html')
    .pipe(gulp.dest(dir.dist));
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src + '/**/*.scss'], ['css']);
  gulp.watch([dir.src + '/**/*.js'], ['js']);
  gulp.watch([dir.src + '/**/*.html'], ['html']);
});

/**
 * Build
 */
gulp.task('build', ['html', 'js', 'css']);

/**
 * Browsersync
 */
gulp.task('server',['build'], function() {
  browserSync.init( {
    server: {
      baseDir: dir.dist + '/'
    },
    files: [
      dir.dist + '/**'
    ]
  });
});

gulp.task('default', ['watch', 'server']);
