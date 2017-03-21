const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
//let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: [
        	'webpack-dev-server/client?http://localhost:8080',
        	'./js/main'
        ],
        styles: './styles/main.styl'
    },
    output: {
        path: __dirname + '/build/',
        filename: "./js/[name].js",
	    publicPath: "/"
    },

   devtool: "cheap-inline-module-source-map",

   plugins: [
       new webpack.NoErrorsPlugin(),
       new webpack.DefinePlugin({
           NODE_ENV: JSON.stringify(NODE_ENV)
        }),
       new webpack.optimize.CommonsChunkPlugin({
           name: "common",
           chunks: ['home', 'about']
       }),
       new ExtractTextPlugin('./css/main.css', {allChunks: true}),
	   /*new HtmlWebpackPlugin({
		        template: './index.html'
           }),*/
	   new webpack.HotModuleReplacementPlugin(),
	   new CopyWebpackPlugin([
		   {
			   from: './img',
			   to: 'img/'
		   },
		   {
			   context: './',
			   from: '**/*.html',
			   to: './'
		   },
		   {
			   context: './',
			   from: '**.pug',
			   to: './'
		   },
	   ], {
		   copyUnmodified: true
	   })
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
	           test: /\.html$/,
	           loader: 'file?name=[path][name].[ext]'
           },
           {
               test: /\.pug$/,
               loader: 'pug-loader'
           },
           {
               test: /\.css$/,
               loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version')
           },
            {
               test: /\.styl$/,
               loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 2 version!stylus?resolve url')
           },
           {
               test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
               loader: 'file?name=[path][name].[ext]'
           }
       ]
   },
    
   devServer: {
       inline: true,
	   historyApiFallback: true,
	   outputPath: "./build"
   }
   
   
};