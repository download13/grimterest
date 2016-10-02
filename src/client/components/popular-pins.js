import {connect} from 'react-redux';
import PinWall from './pin-wall';


export default connect(
	({popularPins, pinCache}) => ({pins: popularPins.map(id => pinCache[id])})
)(PinWall);
