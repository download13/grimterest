import {registerComponent} from 'prux';
import './pin-card';


registerComponent('popular-pins', {
	props: {pins: []},
	render({h, props: {pins}}) {
		return pins.map(pin => <pin-card pin={pin}/>);
	}
});
