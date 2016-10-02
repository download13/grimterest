import React from 'react';
import {Link} from 'react-router';
import NavLink from './atoms/nav-link';
import AuthBlock from './atoms/auth-block';


const TitleLink = (props) => <Link {...props} className="nav-item title is-tab" activeClassName="is-active" style={{margin: 0}} />;

export default function App({children}) {
	return <div className="grimterist-app">
		<header className="grimterist-header">
			<nav className="nav has-shadow">
				<TitleLink to="/">Grimterist</TitleLink>
				<NavLink to="/create">Create Post</NavLink>
				<AuthBlock />
			</nav>
		</header>
		<main>{children}</main>
	</div>
}
