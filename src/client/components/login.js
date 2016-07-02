import {registerComponent} from 'prux';


registerComponent('login-form', {
	props: {user: null},
	render({h, props}) {
		if(props.user) {
			return <div style="text-align:center;padding-top:100px;">You are already logged in</div>;
		}

		return <div style="text-align:center;padding-top:100px;">
			<button class="button is-primary is-large">
				<span class="icon "><i class="fa fa-twitter"></i></span>&nbsp;
				Login with Twitter
			</button>
		</div>;
	}
});
