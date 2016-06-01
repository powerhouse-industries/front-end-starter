const config = require('./config'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './app/scripts/main.js',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new FaviconsWebpackPlugin({
      logo: './app/images/logo.png',
      prefix: '/images/touch/',
      emitStats: false,
      persistentCache: false,
      inject: true,
      background: config.theme_color,
      title: config.site_name,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      title: config.site_name,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortClassName: true
      },
      hash: true
    })
  ],
  output: {
    path: __dirname + '/dist/',
    filename: '/scripts/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
