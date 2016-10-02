import React from 'react';
import {connect} from 'react-redux';


const Login = ({loggedIn, user}) => {
	if(loggedIn) {
		return <span>You are already logged in</span>
	}

	return <div className="login-form">
		<div className="title is-3">Select your login method</div>
		<button className="button is-primary is-large" onClick={loginWithTwitter}>
			<span className="icon"><i className="fa fa-twitter"></i></span>&nbsp;
			<span>Login with Twitter</span>
		</button>
	</div>
};

function loginWithTwitter() {
	window.location.assign('/auth/twitter');
}

export default connect(
	({user}) => ({loggedIn: !!user.id, user})
)(Login);
