var vue = require('vue-loader')
var path = require('path')
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    'vue-credit-card': './src/index.js'
  },
  output: {
    filename: './dist/[name].js',
    library: 'VueCard',
    libraryTarget: 'umd'
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules/,
        loader: 'babel'
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      // },
      // {
      //     test: /\.(scss|sass)/,
      //     loader: ExtractTextPlugin.extract('vue-style-loader','css!sass')
      // },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!stylus-loader')
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: {
        // scss: 'vue-style!css!sass'
        // sass: 'vue-style!css!sass'
        // css: ExtractTextPlugin.extract('css'),
        // sass: ExtractTextPlugin.extract('css!sass'),
        // sass: ExtractTextPlugin.extract('vue-style-loader', 'sass-loader'),
        // scss: ExtractTextPlugin.extract('vue-style-loader', 'sass-loader')
        // scss: ExtractTextPlugin.extract('stylus-loader', 'css-loader!sass-loader')
        // scss: ExtractTextPlugin.extract('style', 'css?sourceMap&localIdentName=[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded')
        // scss: ExtractTextPlugin.extract('style','css!sass')
        // scss:extractCSS.extract(['css','sass']),
        // css:extractCSS.extract("style-loader", "css-loader")
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {

  delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
    // new ExtractTextPlugin('build.css')
  ]
}
