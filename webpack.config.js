const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        home: "./home",
        about: "./about"
    },
    output: {
        path: __dirname + '/public/js',
        filename: "[name].js",
        library: "[name]"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

   devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

   plugins: [
       new webpack.NoErrorsPlugin(),
       new webpack.DefinePlugin({
           NODE_ENV: JSON.stringify(NODE_ENV)
        }),
       new webpack.optimize.CommonsChunkPlugin({
           name: "common",
           chunks: ['home', 'about']
       }),
       new ExtractTextPlugin('./css/styles.css')
   ],

   resolve: {
       modulesDirectories: ['node_modules'],
       extensions: ['', '.js']
   },

   resolveLoader: {
       modulesDirectories: ['node_modules'],
       moduleTemplates: ['*-loader', '*'],
       extensions: ['', '.js']
   },

   module: {
       loaders: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               plugins: ['transform-runtime']
           },
           {
               test: /\.pug$/,
               loader: 'pug'
           },
           {
               test: /\.css$/,
               loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browser=last 2 version')
           },
            {
               test: /\.styl$/,
               loader: ExtractTextPlugin.extract('style' ,'css!autoprefixer?browser=last 2 version!stylus?resolve url')
           },
           {
               test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
               loader: 'file?name=[path][name].[ext]'
           }
       ]
   },

};

if (NODE_ENV == 'production') {
    module.exports.plugins.push (
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}