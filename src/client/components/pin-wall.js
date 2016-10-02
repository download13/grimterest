import React from 'react';
import PinCard from './pin-card';


const PinWall = ({pins}) => {
	return <div className="pin-wall">
		{pins.map(pin => <PinCard key={pin.id} {...pin} />)}
	</div>
};

export default PinWall;