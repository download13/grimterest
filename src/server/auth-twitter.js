import Flutter from 'flutter';


export default app => {
	const flutter = new Flutter({
		consumerKey: '4zzYqkTfnkRUU0a0LcKww59lB',
		consumerSecret: 'udTG4ExrnUidi6vZjs3FlQbliozp94y6SejHY3n33qm2deKVhS',
		loginCallback: 'http://127.0.0.1/auth/twitter/callback',
		authCallback(req, res, next) {
			if(req.error) {
				console.error(req.error);
				res.status(500).send(req.error);
				return;
			}

			var accessToken = req.session.oauthAccessToken;
			var secret = req.session.oauthAccessTokenSecret;
			console.log(req.session)

			// TODO: Store token and secret
			res.redirect('/');
		},
		cache: false
	});

	app.get('/auth/twitter', flutter.connect);
	app.get('/auth/twitter/callback', flutter.auth);
};
