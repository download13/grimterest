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
		} else if(type === 'STORE_POPULAR' || type === 'STORE_MY') {
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
	myPins(pins = [], {type, payload}) {
		if(type === 'STORE_MY') {
			return payload.map(item => item.id);
		}

		return pins;
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
