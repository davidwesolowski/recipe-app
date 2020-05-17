const path = require('path');

module.exports = () => ({
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, '../public'),
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		]
	}
});
