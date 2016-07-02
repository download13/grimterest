import {create as element} from 'deku/lib/element';
import {deleteGrim} from '../../store/actions';
import s from './grim.css';
import Link from '../atoms/link';


export default {
	render({
		props: {
			user,
			pageData: {
				user: author,
				grim
			}
		},
		dispatch
	}) {
		grim = grim || {};
		author = author || {};

		let deleteBtn = null;
		if(user && user.id === grim.author) {
			deleteBtn = <button class={s.deleteBtn} onClick={() => dispatch(deleteGrim(grim.id))}>Delete</button>
		}

		return <div class={s.holder}>
			<div class={s.grim}>
				<div class={s.buttons}>
					<span class={s.author}>Posted by <Link to={`/user/${author.id}`}>{author.displayName || ''}</Link></span>
					{deleteBtn}
				</div>
				<img class={s.image} src={grim.imageUrl} />
				<div class={s.text}>{grim.text || ''}</div>
			</div>
		</div>
	}
}
