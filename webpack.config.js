const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: {
    'app': [
      path.resolve(__dirname, 'client/index.tsx')
    ]
  },

  mode: 'development',

  devtool: "source-map",

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    rules: [
      // TypeScript files
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      // SCSS files
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              'sourceMap': true,
              'importLoaders': 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ autoprefixer ]
            }
          },
          'sass-loader'
        ]
      },      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/template.html'),
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'client/public')
    }])
  ],
};
