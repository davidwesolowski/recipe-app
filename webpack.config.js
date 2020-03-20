const path = require('path');
const config = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'public/dist'),
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.(jpe?g|png)$/,
				loader: 'url-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: '/node_modules'
			}
		]
	},
	devtool: 'eval-cheap-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		publicPath: '/dist/'
	}
};

module.exports = config;
