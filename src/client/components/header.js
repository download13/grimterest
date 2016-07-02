import {registerComponent} from 'prux';
import nop from 'nop';


const noUnderline = {
	textDecoration: 'none',
	color: '#fff'
};


registerComponent('grimterist-header', {
	props: {
		loggedIn: false,
		displayName: '',
		onLogin: nop,
		onLogout: nop,
		pages: []
	},
	render({
		h,
		props: {
			pages
		}
	}) {
		return <nav class="nav has-shadow">
			<a class="nav-item title" href="/" style="margin:0;">Grimterist</a>
			{pages.map(page =>
				<a
					key={page.path}
					href={page.path}
					class={`nav-item is-tab ${page.active ? 'is-active': ''}`}
					style={page.left ? 'margin-left:auto;' : ''}
				>
					{page.name}
				</a>
			)}
		</nav>;
	}
});
