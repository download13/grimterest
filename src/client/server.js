import 'whatwg-fetch';


export function getJson(path) {
	return fetch(path).then(res => res.json());
}
