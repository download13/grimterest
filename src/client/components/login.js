import {registerComponent} from 'prux';


registerComponent('login-form', {
	props: {user: null},
	render({h, props}) {
		if(props.user) {
			return <span>You are already logged in</span>;
		}

		return [
			<div class="title is-3">Select your login method</div>,
			<button class="button is-primary is-large">
				<span class="icon "><i class="fa fa-twitter"></i></span>&nbsp;
				<span>Login with Twitter</span>
			</button>
		];
	}
});
