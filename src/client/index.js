import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import reducers, {initalUser} from './reducers';
import App from './components/app';
import PopularPins from './components/popular-pins';
import UserPins from './components/user-pins';
import PinPage from './components/pin-page';
import 'whatwg-fetch';
import Login from './components/login';
import CreatePin from './components/create-pin';


const store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	})
);
window.store = store;

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={PopularPins} onEnter={loadPopularPins} />
				<Route path="user" onEnter={redirectToMe} />
				<Route path="user/:id" component={UserPins} onEnter={loadUserWithPins} />
				<Route path="pin/:id" component={PinPage} onEnter={loadPin} />
				<Route path="login" component={Login} onEnter={refreshUser} />
				<Route path="create" component={CreatePin} onEnter={ensureLoggedIn} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('approot')
);

refreshUser();


function loadPopularPins() {
	fetch('/api/pins')
		.then(res => res.json())
		.then(pins => store.dispatch({type: 'STORE_POPULAR', payload: pins}));
}

function loadPin({params}) {
	fetch('/api/pin/' + params.id)
		.then(res => res.json())
		.then(pin => store.dispatch({type: 'CACHE_PIN', payload: pin}));
}

function loadUserWithPins({params: {id}}) {
	loadUser(id);
	loadUserPins(id);
}

function loadUser(id) {
	fetch('/api/user/' + id)
		.then(res => res.json())
		.then(pin => store.dispatch({type: 'CACHE_USER', payload: pin}));
}

function loadUserPins(id) {
	fetch(`/api/user/${id}/pins`)
		.then(res => res.json())
		.then(pins => store.dispatch({type: 'STORE_USER_PINS', payload: pins}));
}

function ensureLoggedIn(props, replace) {
	const loggedIn = !!store.getState().user.id;

	if(!loggedIn) {
		replace('/login');
	}
}

function refreshUser() {
	fetch('/api/user', {credentials: 'same-origin'})
		.then(res => {
			if(res.status === 200) {
				return res.json();
			} else {
				return initalUser;
			}
		})
		.then(user => store.dispatch({type: 'SET_USER', payload: user}));
}

function redirectToMe(props, replace) {
	const {id} = store.getState().user;
	
	if(id) {
		replace('/user/' + id);
	} else {
		replace('/');
	}
}