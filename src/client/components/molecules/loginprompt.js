import {create as element} from 'deku/lib/element';
import styles from './loginprompt.css';
import {
	hideLoginPrompt,
	loginWithGoogle
} from '../../store/actions';


const enabled = {
	email: false,
	google: true,
	facebook: false,
	twitter: false,
	github: false
};

export default {
	render({dispatch}) {
		return <div class={styles.holder}>
			<div class={styles.backdrop} onClick={() => dispatch(hideLoginPrompt())} />
			<div class={styles.box}>
				<h2 class={styles.header}>Login</h2>
				{ enabled.email ?(
					<div>
						<input type="email" placeholder="Login or Sign Up with Email" />
						<button>Login</button>
					</div>
					): <noscript/>
				}
				<div>
					{ enabled.google ?
						<button class={styles.btn + ' ' + styles.googleBtn} onClick={() => dispatch(loginWithGoogle())} />
						: <noscript/>
					}
					{ enabled.facebook ?
						<button class={styles.btn + ' ' + styles.fbBtn} />
						: <noscript/>
					}
					{ enabled.twitter ?
						<button class={styles.btn + ' ' + styles.twitterBtn} />
						: <noscript/>
					}
					{ enabled.github ?
						<button class={styles.btn + ' ' + styles.githubBtn} />
						: <noscript/>
					}
				</div>
			</div>
		</div>
	}
}
