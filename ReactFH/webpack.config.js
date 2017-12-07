let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let glob=require('glob');
let PurifyCSSPlugin = require("purifycss-webpack");

let isDev = process.env.NODE_ENV ==='develop';
let port = 9333;
let serverPort = 8333;
let host = 'localhost';
let domain='/';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: isDev ? `http://${host}:${port}/` : domain,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
            },
			{
				test: /\.(eot|svg|woff|woff2|ttf|jpg|png|gif)$/,
				loader: "url-loader",
				options: {
					limit: 8192,
					outputPath:'images/'
				}
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname,"./src"),

		},
		extensions: ['.js', '.jsx']
	},
	context: __dirname,
	devtool: isDev ?'source-map' : '',
	devServer: {
		contentBase:path.resolve(__dirname, "./build"),
		stats: {colors: true},
		hot: true,
		port: port,
		compress:true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		proxy: [
			{
				'/api': {
					target: `http://${host}:${serverPort}/api`,
					pathRewrite: {"^/api": ""}
				}
			}
		]
	},
	plugins: [
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, 'src/*.html')),
		}),
		new CleanWebpackPlugin(['build']),
		new OpenBrowserWebpackPlugin({url: `http://${host}:${port}`}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': isDev ? JSON.stringify('develop') : JSON.stringify('production')}
		}),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
	]
};