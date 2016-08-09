const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './components/index.jsx',
	output: {
		path: `${__dirname}/public`,
		filename: 'scripts.js'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: [
					'es2015',
					'react'
				],
				plugins: [
					'transform-class-properties'
				]
			}
		}]
	}
}