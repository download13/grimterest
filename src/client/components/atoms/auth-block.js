import React from 'react';
import {connect} from 'react-redux';
import NavLink from './nav-link';


const AuthBlock = ({loggedIn, user}) => {
	if(loggedIn) {
		return <div className="nav" style={{margin: '0 0 0 auto'}}>
			<NavLink to="/my">{user.name}</NavLink>
			<NavLink to="/logout">Logout</NavLink>
		</div>
	}

	return <NavLink to="/login" style={{margin: '0 0 0 auto'}}>Login</NavLink>
};

export default connect(
	({user}) => ({loggedIn: !!user.id, user})
)(AuthBlock);
