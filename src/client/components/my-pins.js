import React from 'react';
import {connect} from 'react-redux';
import PinCard from './pin-card';


const MyPins = ({pins}) => {
	return <div className="pin-wall">
		{pins.map(pin => <PinCard key={pin.id} {...pin} />)}
	</div>
};

export default connect(
	({myPins, pinCache}) => ({pins: myPins.map(id => pinCache[id])})
)(MyPins);
