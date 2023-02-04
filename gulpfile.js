const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber'); 
const notify = require('gulp-notify'); 
const postcss = require('gulp-postcss'); 
const autoprefixer = require('autoprefixer'); 
const cssdeclsort = require('css-declaration-sorter');

//参照元パス
const srcPath = {
  css: './scss/style.scss',
  sub: './scss/page/**/*.scss',
 };
 
 //出力先パス
 const destPath = {
  css: './css/',
 };

const cssSass = () => {
  return src(srcPath.css) 
    .pipe( plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }) )
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe( postcss([ autoprefixer(
      {"overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
      cascade: false}
    ) ]) )
    .pipe( postcss([ cssdeclsort({ order: 'alphabetical' }) ]) )
    .pipe(dest(destPath.css)); 
 };

const sub = () => {
  return src(srcPath.sub)
    .pipe( plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }) )
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe( postcss([ autoprefixer(
      {"overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
      cascade: false}
    ) ]) )
    .pipe( postcss([ cssdeclsort({ order: 'alphabetical' }) ]) )
    .pipe(dest(destPath.css));  
 };
 
exports.sass = series(cssSass, sub);


// watch
exports.default = () => {
  watch(srcPath.css, cssSass);
  watch(srcPath.sub, sub);
};


