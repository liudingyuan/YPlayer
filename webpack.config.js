var webpack = require('webpack');

module.exports = {
	entry: './assets/scripts/YPlayer.js',
	output: {
		path: './dist',
		filename: 'YPlayer.min.js',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
		    {
		    	test: /\.scss$/,
		    	loader: 'style!css!sass'
		    },
            {
            	test: /\.js$/,
            	exclude: /node_modules/,
            	loader: 'babel',
            	query: {
            		presets: ['es2015']
            	}
            }
		]
	},
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
        	compress: {
        		warnings: false
        	}
        })
	],
	devServer: {
		publicPath: '/dist/',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	}
};