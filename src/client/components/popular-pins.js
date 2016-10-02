import React from 'react';
import {connect} from 'react-redux';
import PinCard from './pin-card';


const PopularPins = ({pins}) => {
	return <div className="pin-wall">
		{pins.map(pin => <PinCard key={pin.id} {...pin} />)}
	</div>
};

export default connect(
	({popularPins, pinCache}) => ({pins: popularPins.map(id => pinCache[id])})
)(PopularPins);
