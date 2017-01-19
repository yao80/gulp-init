//初期設定項目
var useWP = false;
var themeNamePC;
var themeNameSP;
var destWP;
var proxy;

var path = require('path');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

if(useWP === true){
  themeNamePC = 'theme-pc';
  themeNameSP = 'theme-sp';
  destWP = './build/wp-content/themes/' + themeNamePC;
  proxy = 'local.dev';
}
//出力先設定
var root = '/';
var src = './src';
var excludeSrc = '!./src';
var dest = './build';
// var excludeDest = '!./build';
var relativeSrcPath = path.relative('.',src);

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};
var options = minimist(process.argv.slice(2), knownOptions);

module.exports = {

  option: {
    useWP: useWP
  },

  webpack: {
    src: src + '/**/js/main.js',
    // dest: dest + '/js',
    dest: dest,
    destWP: destWP + '/js'
  },

  copy: {
    src: [   // 今後ただコピーするファイルが増えそうなので配列にしておく
      src + '/common/**/*.*',
      src + '/**/images/**/*.*'
    ],
    dest: dest
  },

  pug: {
    src: [
      src + '/**/*.pug',
      excludeSrc + '/**/template/*.pug'
    ],
    dest: dest + '/'
  },

  wp: {
    src: destWP + '/**/*.php'
  },

  sass: {
    src: src + '/**/css/**/*.scss',
    // dest: dest + '/css',
    dest: dest,
    destWP: destWP + '/css',
    minify: options.env
  },

  sprites: {
    rootPath: root,
    src: src,
    scss: 'scss/sprites',
    image: 'images',
    dest: dest + '/images/sprites',
    destWP: destWP + '/images/sprites'
  },

  bs: {
    baseDir: './build',
    proxy: proxy
  },

  bower: {
    output: {
      filename: 'libs.js'
    },
    dest1:  src + '/common/js',
    dest2:  dest + '/common/js'
  },

  clean: {
    dest: dest + '/',
    destWP: destWP + '/'
  },

  watch: {
    js: [relativeSrcPath + '/**/js/**'],
    sass: [relativeSrcPath + '/**/css/**/*.scss'],
    image: [relativeSrcPath + '/**/images/**/*.*'],
    sprites: [relativeSrcPath + '/**/images/sprites/**/*.png'],
    wp: [
      './build/wp-content/themes/' + themeNamePC + '/**/*.php',
      './build/wp-content/themes/' + themeNameSP + '/**/*.php'
    ],
    pug: [
      relativeSrcPath + '/**/*.pug'
    ]
  }
};
