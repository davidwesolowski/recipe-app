const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const modeType = mode => require(`./built-utils/webpack.${mode}`)();

const config = ({ mode }) => {
	return webpackMerge(
		{
			entry: ['@babel/polyfill', './src/index.js'],
			output: {
				path: path.join(__dirname, 'public/dist'),
				filename: 'bundle.js'
			},
			module: {
				rules: [
					{
						test: /\.(jpe?g|png)$/,
						loader: 'url-loader'
					},
					{
						test: /\.jsx?$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					}
				]
			},
			node: {
				fs: 'empty'
			},
			plugins: [new webpack.ProgressPlugin()]
		},
		modeType(mode)
	);
};

module.exports = config;
