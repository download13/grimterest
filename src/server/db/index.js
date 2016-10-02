import {Database} from 'sqlite3';
import {pins, users} from './sample-data';
import uuid from 'uuidv4';
import {createHash} from 'crypto';
import config from '../config';


let db = null;

export function dbConnect() {
	return createDb()
		.then(database => db = database)
		.then(ensureSampleData);
}

function createDb() {
	return new Promise((resolve, reject) => {
		const database = new Database(config.database, err => {
			if(err) reject(err);
			else resolve(database);
		});
	});
}

function ensureSampleData() {
	return dbGet('SELECT id FROM users WHERE id = bab2a452-6179-4914-87a8-f5169e42b729')
		.then(user => {
			if(!user) {
				return Promise.all([
					buildUsers(),
					buildPins()
				]);
			}
		})
		.catch(err => null);
}

function buildUsers() {
	return dbRun(`
		CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			name TEXT,
			email TEXT,
			avatar_url TEXT
		)
	`).then(() => new Promise((resolve, reject) => {
		const statement = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?)');

		users.forEach(user => {
			statement.run([user.id, user.name, user.email, user.avatar_url]);
		});

		statement.finalize(err => {
			if(err) reject(err);
			else resolve();
		});
	}));
}

function buildPins() {
	return dbRun(`
		CREATE TABLE IF NOT EXISTS pins (
			id TEXT PRIMARY KEY,
			poster_id TEXT,
			image_url TEXT,
			thumb_url TEXT,
			text TEXT,
			post_time INTEGER
		)
	`).then(() => new Promise((resolve, reject) => {
		const statement = db.prepare('INSERT INTO pins VALUES (?, ?, ?, ?, ?, ?)');

		pins.forEach(pin => {
			statement.run([pin.id, pin.posterId, pin.imageUrl, pin.thumbUrl, pin.text, pin.postTime]);
		});

		statement.finalize(err => {
			if(err) reject(err);
			else resolve();
		});
	}));
}


export function ensureUser(email, name) {
	return getUser(email).then(user => {
		if(user) return user;
		else return createUser(email, name);
	});
}

function getUser(email) {
	return dbGet('SELECT * FROM users WHERE email = ?', [email]);
}

function createUser(email, name) {
	const emailHash = createHash('md5').update(email).digest('hex');

	const avatar_url = 'https://www.gravatar.com/avatar/' + emailHash;

	const user = {
		id: uuid(),
		name,
		email,
		avatar_url,
	};

	return dbRun('INSERT INTO users VALUES (?, ?, ?, ?)', [
		user.id,
		name,
		email,
		avatar_url
	]).then(() => user);
}

export function dbRun(queryString, params) {
	return new Promise((resolve, reject) => {
		db.run(queryString, params, err => {
			if(err) reject(err);
			else resolve();
		});
	});
}

export function dbGetAll(queryString, params) {
	return new Promise((resolve, reject) => {
		db.all(queryString, params, (err, rows) => {
			if(err) reject(err);
			else resolve(rows);
		});
	});
}

export function dbGet(queryString, params) {
	return new Promise((resolve, reject) => {
		db.get(queryString, params, (err, row) => {
			if(err) reject(err);
			else resolve(row);
		});
	});
}
