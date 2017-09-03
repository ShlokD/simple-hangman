var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/main.js",
  output: {
    path:  path.resolve(__dirname, 'dist'),
    filename: "build.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
   contentBase: path.join(__dirname, ""),
   compress: true,
   port: 9000,
   hot: true
 }
}
