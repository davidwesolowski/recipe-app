const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	entry: ['@babel/polyfill', './src/index.js'],
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
		compress: true,
		historyApiFallback: true,
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.jsx']
	},
	node: {
		fs: 'empty'
	}
	//plugins: [new BundleAnalyzerPlugin()]
};

module.exports = config;
