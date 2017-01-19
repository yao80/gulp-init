//初期設定項目
var useWP = false;

var path = require('path');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

if(useWP === true){
  var themeNamePC = 'theme-pc';
  var themeNameSP = 'theme-sp';
  var proxy = 'local.dev';

  if(argv.sp){
    var destWP = './build/wp-content/themes/' + themeNameSP;
    // var excludeDestWP = '!./build/wp-content/themes/' + themeNameSP;
  }else{
    var destWP = './build/wp-content/themes/' + themeNamePC;
    // var excludeDestWP = '!./build/wp-content/themes/' + themeNamePC;
  }

}else{
  var themeNamePC;
  var themeNameSP;
  var proxy;
  var destWP;
  // var excludeDestWP;

}

//出力先設定
if(argv.sp){
  var root = '/sp/';
  var src = './src/sp';
  var excludeSrc = '!./src/sp';
  var dest = './build/sp';
  // var excludeDest = '!./build/sp';
}else{
  var root = '/';
  var src = './src';
  var excludeSrc = '!./src';
  var dest = './build';
  // var excludeDest = '!./build';
}
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
    src: src + '/js/main.js',
    dest: dest + '/js',
    destWP: destWP + '/js'
  },

  copy: {
    src: [   // 今後ただコピーするファイルが増えそうなので配列にしておく
      src + '/common/**/*.*',
      src + '/images/**/*.*'
    ],
    dest: dest
  },

  pug: {
    src: [
      src + '/**/*.pug',
      excludeSrc + '/**/_*.pug'
    ],
    dest: dest + '/'
  },

  wp: {
    src: destWP + '/**/*.php'
  },

  sass: {
    src: src + '/scss/**/*.scss',
    dest: dest + '/css',
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
    dest: src + '/'
  },

  clean: {
    dest: dest + '/',
    destWP: destWP + '/'
  },

  watch: {
    js: [relativeSrcPath + '/js/**'],
    sass: [relativeSrcPath + '/scss/**/*.scss'],
    image: [relativeSrcPath + '/images/**/*.*'],
    sprites: [relativeSrcPath + '/images/sprites/**/*.png'],
    wp: [
      './build/wp-content/themes/' + themeNamePC + '/**/*.php',
      './build/wp-content/themes/' + themeNameSP + '/**/*.php'
    ],
    pug: [
      relativeSrcPath + '/**/*.pug'
    ]
  }
};
