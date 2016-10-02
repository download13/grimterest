module.exports = [
	{
		entry: __dirname + '/src/client/index.js',
		output: {
			path: 'dist/client',
			filename: 'app.js'
		},
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['babel-preset-es2015-native-modules'],
						plugins: [
							['babel-plugin-transform-react-jsx'],
							'babel-plugin-transform-object-rest-spread'
						]
					}
				}
			]
		}
	},
	{
		entry: __dirname + '/src/server/index.js',
		output: {
			path: 'dist/server',
			filename: 'index.js'
		},
		target: 'node',
		externals: {
			'express': 'commonjs express',
			'sqlite3': 'commonjs sqlite3',
			'connect-sqlite3': 'commonjs connect-sqlite3',
			'knex': 'commonjs knex',
			'objection': 'commonjs objection',
			'flutter': 'commonjs flutter',
			'body-parser': 'commonjs body-parser'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['babel-preset-es2015-native-modules'],
						plugins: ['babel-plugin-transform-object-rest-spread']
					}
				}
			]
		}
	}
];
