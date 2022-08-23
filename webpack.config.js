const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: path.resolve(appDirectory, 'src/app.ts'), //path to the main .ts file
  output: {
    filename: 'js/appBundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080, //port that we're using for local host (localhost:8080)
    static: path.resolve(appDirectory, 'public'), //tells webpack to serve from the public folder
    hot: true,
    devMiddleware: {
      publicPath: '/',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    allowedHosts: [
      '.repl.it',
      '.repl.co',
      '.repl.run'
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
  ],
};
