import {registerComponent} from 'prux';
import {registerRouter} from '../router';
import {getJson} from '../server';
import './header';
import './popular-pins';
import './create-pin';
import './login';


registerRouter('grimterist-app', {
	onPathSet({path, state, update}) {
		if(path === '/') {
			getJson('/api/pins').then(pins => update('SET_PINS', pins));
		} else if(path === '/create' && !state.user) {
			window.history.replaceState(null, '', '/login');
		}
	},
	render({h, path, state}) {
		console.log('app path', path);
		const pages=[
			{name: 'Latest', path: '/'},
			{name: 'Create', path: '/create', left: true},
			{name: 'Login', path: '/login'}
		];
		let body;
		if(path === '/') {
			//console.log('app state', state)
			body = <popular-pins pins={state.pins}/>;
			pages[0].active = true;
		} else if(path === '/create') {
			body = <create-pin/>;
			pages[1].active = true;
		} else if(path === '/login') {
			body = <login-form user={state.user}/>;
			pages[2].active = true;
		} else {
			body = 'Page not found';
		}
		console.log('body',body);

		return [
			<grimterist-header
				loggedIn={false}
				displayName={null}
				onLogin={() => {
					horizon.authEndpoint('twitter').subscribe(path =>
						location.assign(path)
					);
				}}
				onLogout={() => {
					Horizon.clearAuthTokens();
				}}
				pages={pages}
			/>,
			body
		];
	},
	reduce(state = {}, {type, payload}) {
		switch(type) {
			case 'SET_PINS':
				return {...state, pins: payload};
			case 'SET_USER':
				return {...state, user: payload};
			default:
				return state;
		}
	}
});
