const webpack           = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

lintRules = {
  "rules": {
    "indentation": 2,
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-no-vendor-prefix": true,
    "max-empty-lines": 5,
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "property-no-vendor-prefix": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-trailing-semicolon": "always",
    "selector-list-comma-space-before": "never",
    "selector-list-comma-newline-after": "always",
    "selector-no-id": true,
    "string-quotes": "double",
    "value-no-vendor-prefix": true,
    "no-duplicate-selectors": true,
    "no-descending-specificity": true,
    "no-extra-semicolons": true,
    "no-unknown-animations": true,
    "max-nesting-depth": 3,
    "length-zero-no-unit": true,
    "property-case": "lower",
    "shorthand-property-no-redundant-values": true,
    "declaration-no-important": true,
    "block-opening-brace-space-before": "always",
    "block-opening-brace-newline-after": "always",
    "block-no-empty": true
  }
}

module.exports = {
  devtool: 'cheap-module-source-map', // cheap-module-source-map
  entry: './app/scripts/main.js',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
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
        include: [__dirname + '/app/'],
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          compact: false
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader?sourceMap&importLoaders=1!postcss-loader?parser=postcss-scss'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss: function () {
    return {
      defaults: [
        require('stylelint')(lintRules),
        require('postcss-strip-inline-comments'),
        require('precss'),
        require('postcss-nested-props'),
        require('postcss-cssnext'),
        require('postcss-inline-svg')({ path: 'app/images' })
      ]
    };
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
