var path = require('path');
var webpack = require("webpack");
var minimize = process.argv.indexOf('--minimize') !== -1;
var plugins = [
        new webpack.ProvidePlugin({
            "React": "react"
        })];
var filelocation = "./client/public/bundle.min.js"

if (minimize) {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    })
  )
  plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
        compress: {
            warnings: false
        }
    }
  ));
  filelocation = "./client/public/bundle.min.js"
}
module.exports = {
    entry: './client/src/index.js',
    output: {
        path: __dirname,
        filename: filelocation
    },
    module: {
        loaders: [{
            test: /\.js(x|)?$/,
            loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-2'],
            include: [
                path.resolve(__dirname, "./client/src"),
            ],
            exclude: [
                path.resolve(__dirname, "node_modules"),
            ]
          },
          // These Loaders are used for the bootstrap-webpack module
          { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf$/,    loader: "file-loader" },
          { test: /\.eot$/,    loader: "file-loader" },
          { test: /\.svg$/,    loader: "file-loader" }
          // END: bootstrap-webpack module loaders
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    },
    plugins: plugins,
    devtool: 'source-map'
};
