import {create as element} from 'deku/lib/element';
import ItemPanel from '../molecules/itempanel';
import s from './user.css';


export default {
	render({
		props: {
			pageData: {
				user,
				grims
			}
		}
	}) {
		grims = grims || [];

		return <div>
			<h3 class={`center-holder ${s.username}`}>{user.displayName}</h3>
			<ItemPanel items={grims} />
		</div>
	}
}
