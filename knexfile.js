const seeds = {
	directory: './storage/seeds'
};
const migrations = {
	directory: './storage/migrations'
};

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './storage/data/db-dev.sqlite3'
		},
		seeds,
		migrations
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: './storage/data/db.sqlite3'
		},
		seeds,
		migrations
	}
};
