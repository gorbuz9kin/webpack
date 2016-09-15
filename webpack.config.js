'use strict';

var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackConfig = require('webpack-config');
var WebpackDevServer = require("webpack-dev-server");

var precss = require('precss');
var autoprefixer = require('autoprefixer');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: './js/main',
        style: './sass/main'
    },
    output: {
        path: __dirname + '/build',
        filename: 'js/[name].js',
        publicPath: '../'
    },
    resolve: {
        extensions: ['', '.js', '.scss', '.css'],
        modulesDirectories: ['node_modules']
    },
    devtool: "inline-source-maps",
    watch:true,
    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ],
    module: {
        loaders: [{
                test: /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap')
            },
            {
                test: /\.(html)$/,
                loader: 'file?name=[path][name].[ext]'
            },
            {
                test: /\.(png|jpg|svg|ttf||eot||woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            }]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        inline: true
    }

};