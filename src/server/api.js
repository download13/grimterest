import {dbGet, dbGetAll, dbRun} from './db';
import uuid from 'uuidv4';
import bodyParser from 'body-parser';


const jsonBody = bodyParser.json();

export default app => {
	app.get('/api/user', usersOnly, (req, res) => {
		dbGet('SELECT * FROM users WHERE id = ?', [req.userId])
			.then(user => {
				res.send(user);
			}, err => {
				res.status(500).send(err.message);
				console.error(err);
			});
	});

	app.get('/api/user/pins', usersOnly, (req, res) => {
		const page = parseInt(req.query.page);

		const validatedPage = isNaN(page) ? 0 : page;

		dbGetAll(`
			SELECT
				pins.id,
				image_url,
				thumb_url,
				text,
				post_time,
				users.name as poster_name,
				users.avatar_url as poster_avatar
		 	FROM pins
				INNER JOIN users ON users.id = pins.poster_id
			WHERE poster_id = ?
			ORDER BY post_time DESC
			LIMIT 20 OFFSET ?
		`, [req.userId, validatedPage * 20])
			.then(rows => {
				res.send(rows);
			}, err => {
				res.status(500).send(err.message);
				console.error(err);
			});
	});

	app.get('/api/pins', (req, res) => {
		const page = parseInt(req.query.page);

		const validatedPage = isNaN(page) ? 0 : page;

		dbGetAll(`
			SELECT
				pins.id,
				image_url,
				thumb_url,
				text,
				post_time,
				users.name as poster_name,
				users.avatar_url as poster_avatar
		 	FROM pins
				INNER JOIN users ON users.id = pins.poster_id
			ORDER BY post_time DESC
			LIMIT 20 OFFSET ?
		`, [validatedPage * 20])
			.then(rows => {
				res.send(rows);
			}, err => {
				res.status(500).send(err.message);
				console.error(err);
			});
	});

	app.get('/api/pin', (req, res) => {
		const {id} = req.query;

		dbGet(`
			SELECT
				pins.id,
				image_url,
				thumb_url,
				text,
				post_time,
				users.name as poster_name,
				users.avatar_url as poster_avatar
			FROM pins
				INNER JOIN users ON users.id = pins.poster_id
			WHERE pins.id = ?
		`, [id])
			.then(pin => {
				res.send(pin);
			}, err => {
				res.status(500).send(err.message);
				console.error(err);
			});
	});

	app.post('/api/pin', usersOnly, jsonBody, (req, res) => {
		const url = req.body.image_url;

		dbRun('INSERT INTO pins VALUES (?, ?, ?, ?, ?, ?)', [
			uuid(),
			req.userId,
			url,
			url,
			req.body.text,
			Date.now()
		]).then(pin => {
			res.status(201).send('Created');
		}, err => {
			res.status(500).send(err.message);
			console.error(err);
		});
	});
};


function usersOnly(req, res, next) {
	const {userId} = req.session;

	if(!userId) return res.status(401).send('Not logged in');

	req.userId = userId;

	next();
}
