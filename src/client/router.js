import {registerComponent} from 'prux';
import nop from 'nop';


export function registerRouter(name, routerSpec) {
	routerSpec = {
		onPathSet: nop,
		reduce: nop,
		onMount: nop,
		onUnmount: nop,
		...routerSpec
	};

	registerComponent(name, {
		onMount({root, state, update}) {
			const popHandler = () => {
				const path = location.pathname;
				const state = update();
				console.log('popHandler', path, state);
				routerSpec.onPathSet({update, state, path});
				update('_@ROUTER_SET_PATH', path);
			};

			const linkHandler = e => {
				const el = e.target;
				if(el.localName === 'a' && el.origin === location.origin) {
					e.preventDefault();
					const {pathname} = el;
					window.history.pushState(null, '', el.href);
					popHandler();
				}
			};

			root.addEventListener('click', linkHandler, true);
			window.addEventListener('popstate', popHandler);
			update('_@ROUTER_SET_HANDLERS', {popHandler, linkHandler});
			routerSpec.onMount({
				state,
				path: state._router.path,
				update
			});
			popHandler();
		},
		render({h, state}) {
			return routerSpec.render({
				h,
				path: state._router.path,
				state
			});
		},
		reduce(state = {_router: {path: '/'}}, {type, payload}) {
			switch(type) {
				case '_@ROUTER_SET_HANDLERS':
					return {
						...state,
						_router: {
							...state._router,
							...payload
						}
					};
				case '_@ROUTER_SET_PATH':
					return {
						...state,
						_router: {
							...state._router,
							path: payload
						}
					};
				default:
					return routerSpec.reduce(state, {type, payload});
			}
		},
		onUnmount({root, state}) {
			window.removeEventListener('popstate', state._router.popHandler);
			root.removeEventListener('click', state._router.linkHandler, true);
			routerSpec.onUnmount({
				state,
				path: state._router.path
			});
		}
	});
}
