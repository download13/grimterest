import path from 'path';
import Flutter from 'flutter';
import session from 'express-session';
import createSQLiteStore from 'connect-sqlite3';
import {ensureUser} from './db';
import config from './config';


const SQLiteStore = createSQLiteStore(session);

export default app => {
	const flutter = new Flutter({
		consumerKey: '4zzYqkTfnkRUU0a0LcKww59lB',
		consumerSecret: 'udTG4ExrnUidi6vZjs3FlQbliozp94y6SejHY3n33qm2deKVhS',
		loginCallback: `${config.protocol}://${config.domain}/auth/twitter/callback`,
		authCallback(req, res, next) {
			if(req.error) {
				console.error(req.error);
				res.status(500).send(req.error);
				return;
			}

			flutter.API.fetch(
				'account/verify_credentials.json',
				{include_email: 'true'},
				req.session.oauthAccessToken,
				req.session.oauthAccessTokenSecret,
				(err, profile) => {
					if(err) {
						console.error(err);
						res.status(500).send(err);
						return;
					}

					ensureUser(profile.email, profile.name).then(user => {
						req.session.userId = user.id;
						res.redirect('/');
					}, err => {
						res.send(err);
						console.error(err);
					});
				}
			);
		},
		cache: false
	});

	app.use(session({
		secret: '2c52f327-b615-4443-884d-030ee555d5d7',
		saveUninitialized: false,
		resave: false,
		store: new SQLiteStore({db: config.sessionDatabase})
	}));

	app.get('/auth/twitter', flutter.connect);
	app.get('/auth/twitter/callback', flutter.auth);
};
