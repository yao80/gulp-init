module.exports = {
  entry: {
    'js/': './src/js/main.js',
    'sp/js/': './src/sp/js/main.js',
  },
  output: {
    filename: '[name]bundle.js',
    path: __dirname + '/build'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader',"eslint-loader"]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  cache: true
};
