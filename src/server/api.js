import {User, Pin} from './models';


export default app => {
	app.get('/api/pins', (req, res) => {
		const page = parseInt(req.query.page);
		const validatedPage = isNaN(page) ? 0 : page;

		Pin
			.query()
			.page(validatedPage, 20)
			.eager('poster')
			.then(({results: pins}) => {
				const publicPins = pins.map(toPublicPin);
				console.log('api pins', publicPins)
				res.send(publicPins);
			});
	});
};


function toPublicPin(pin) {
	return {
		id: pin.id,
		posterName: pin.poster.name,
		posterAvatar: pin.poster.avatarUrl,
		imageUrl: pin.imageUrl,
		text: pin.text,
		postTime: pin.postTime
	};
}
