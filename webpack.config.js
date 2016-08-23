module.exports = {
	entry: './assets/scripts/main.js',
	output: {
		path: './dist',
		filename: 'build.js'
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
	}
};