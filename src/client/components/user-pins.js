import React from 'react';
import {connect} from 'react-redux';
import PinWall from './pin-wall';


const UserPins = ({user, pins}) => {
	return <div>
		<div className="user-header">
			<img className="image is-64x64" src={user.avatar_url} />
			<span className="title is-2" style={{marginLeft: 10}}>{user.name}'s posts</span>
		</div>
		<PinWall pins={pins} />
	</div>
};

export default connect(
	({userCache, userPins, pinCache}) => ({userCache, userPins, pinCache}),
	dispatch => ({}),
	({userCache, userPins, pinCache}, _, {params}) => {
		const {id} = params;
		
		return {
			user: userCache[id] || {},
			pins: (userPins[id] || []).map(id => pinCache[id])
		};
	}
)(UserPins);
