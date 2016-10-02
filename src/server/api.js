import {dbGet, dbGetAll, dbRun} from './db';
import uuid from 'uuidv4';
import bodyParser from 'body-parser';


const jsonBody = bodyParser.json();

export default app => {
	app.get('/api/user', usersOnly, (req, res) => {
		res.redirect('/api/user/' + req.userId);
	});

	app.get('/api/user/:id', (req, res) => {
		const {id} = req.params;
		// TODO: remove email from public user data
		dbGet('SELECT * FROM users WHERE id = ?', [id]).then(
			({id, name, avatar_url}) => res.send({id, name, avatar_url}),
			err => {
				res.status(500).send(err.message);
				console.error(err);
			}
		);
	});

	app.get('/api/user/:id/pins', (req, res) => {
		const {id} = req.params;

		const page = parseInt(req.query.page);

		const validatedPage = isNaN(page) ? 0 : page;

		dbGetAll(`
			SELECT
				pins.id,
				image_url,
				thumb_url,
				text,
				post_time,
				poster_id,
				users.name as poster_name,
				users.avatar_url as poster_avatar
		 	FROM pins
				INNER JOIN users ON users.id = poster_id
			WHERE poster_id = ?
			ORDER BY post_time DESC
			LIMIT 20 OFFSET ?
		`, [id, validatedPage])
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
				poster_id,
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

	app.get('/api/pin/:id', (req, res) => {
		const {id} = req.params;

		dbGet(`
			SELECT
				pins.id,
				image_url,
				thumb_url,
				text,
				post_time,
				poster_id,
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
	
	app.delete('/api/pin/:id', usersOnly, (req, res) => {
		// TODO: Do something
		dbRun('DELETE FROM pins WHERE id = ? AND poster_id = ?', [
			req.params.id,
			req.userId
		]).then(
			() => res.send('Deleted'),
			err => {
				res.status(500).send(err.message);
				console.error(err);
			}
		);
	});
};


function usersOnly(req, res, next) {
	const {userId} = req.session;

	if(!userId) return res.status(401).send('Not logged in');

	req.userId = userId;

	next();
}
