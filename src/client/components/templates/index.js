import {create as element} from 'deku/lib/element';
import ItemPanel from '../molecules/itempanel';


const Index = {
	render({
		props: {
			pageData: {
				grims
			}
		}
	}) {
		grims = grims || [];

		return <div>
			<ItemPanel items={grims} />
		</div>
	}
}


export default Index;
