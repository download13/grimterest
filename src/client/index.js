import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import reducers, {initalUser} from './reducers';
import App from './components/app';
import PopularPins from './components/popular-pins';
import MyPins from './components/my-pins';
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
				<IndexRoute component={PopularPins} onEnter={refreshPopularPins} />
				<Route path="my" component={MyPins} onEnter={refreshMyPins} />
				<Route path="pins/:id" component={PinPage} onEnter={loadPin} />
				<Route path="login" component={Login} onEnter={refreshUser} />
				<Route path="create" component={CreatePin} onEnter={ensureLoggedIn} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('approot')
);

refreshUser();


function refreshPopularPins() {
	fetch('/api/pins')
		.then(res => res.json())
		.then(pins => store.dispatch({type: 'STORE_POPULAR', payload: pins}));
}

// TODO: only store if not 401 status
function refreshMyPins() {
	fetch('/api/user/pins', {credentials: 'same-origin'})
		.then(res => res.json())
		.then(pins => store.dispatch({type: 'STORE_MY', payload: pins}));
}

function loadPin({params}) {
	fetch('/api/pin?id=' + params.id)
		.then(res => res.json())
		.then(pin => store.dispatch({type: 'CACHE_PIN', payload: pin}));
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
