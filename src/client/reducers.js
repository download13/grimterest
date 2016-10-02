export const initalUser = {
	id: '',
	name: '',
	email: '',
	avatar_url: 'about:blank'
};

const initialDraftPin = {
	image_url: '',
	text: ''
};

export default {
	pinCache(pins = {}, {type, payload}) {
		if(type === 'CACHE_PIN') {
			return {
				...pins,
				[payload.id]: payload
			};
		} else if(type === 'UNCACHE_PIN') {
			return without(pins, payload);
		} else if(type === 'STORE_POPULAR' || type === 'STORE_USER_PINS') {
			return {
				...pins,
				...pinsArraytoMap(payload)
			};
		}

		return pins;
	},
	popularPins(pins = [], {type, payload}) {
		if(type === 'STORE_POPULAR') {
			return payload.map(item => item.id);
		}

		return pins;
	},
	userPins(users = {}, {type, payload}) {
		if(type === 'STORE_USER_PINS') {
			if(payload[0]) {
				const userId = payload[0].poster_id;
				
				return {
					...users,
					[userId]: payload.map(pin => pin.id)
				};
			}
		}

		return users;
	},
	userCache(users = {}, {type, payload}) {
		if(type === 'CACHE_USER') {
			return {
				...users,
				[payload.id]: payload
			};
		}

		return users;
	},
	user(user = initalUser, {type, payload}) {
		if(type === 'SET_USER') {
			return payload;
		}

		return user;
	},
	draftPin(draft = initialDraftPin, {type, payload}) {
		if(type === 'SET_DRAFT_IMAGE') {
			return {
				...draft,
				image_url: payload
			};
		} else if(type === 'SET_DRAFT_TEXT') {
			return {
				...draft,
				text: payload
			};
		} else if(type === 'CLEAR_DRAFT') {
			return initialDraftPin;
		}

		return draft;
	}
};

function pinsArraytoMap(arr) {
	const r = {};

	arr.forEach(item => r[item.id] = item);

	return r;
}

function without(obj, key) {
	const r = {...obj};
	
	delete r[key];
	
	return r;
}