/**
 * Created by hector on 10.11.15.
 */
'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//context: './src',
	entry: {
		CommentBox: "./src/js/components/CommentBox.js",
		styleComment: './src/scss/comment.scss'
	},
	output: {
		path: "./build",
		filename: "[name].js",
		publicPath: '/build/',
		library: "app[name]"
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: 'source-map',

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '* '],
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime', "transform-react-jsx"]
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(
					'style', // backup loader when not building .css file
					'css!sass' // loaders to preprocess CSS
				)
			}
		]
	},

	sassLoader: {
		includePaths: ["./build"]
	},

	plugins: [
		//new webpack.ProvidePlugin({}),
		new ExtractTextPlugin('[name].css'),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'/*,
			 minChunks: function(module, count){
			 return count >= 2;
			 }*/
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	],

	externals: {
		react: 'React',
		reactDom: 'ReactDom',
		rxjs: 'Rx'
	}
};