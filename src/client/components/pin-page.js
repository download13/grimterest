import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import ReactImageFallback from 'react-image-fallback';


const PinPage = ({pin, isOwner, deletePin}) => {
	const {id, image_url, text, post_time, poster_id, poster_name, poster_avatar} = pin;

	const postTime = new Date(post_time);

	let editBox = null;
	if(isOwner) {
		editBox = <button onClick={() => deletePin(id)}>Delete</button>;
	}

	return <div className="pin-page card" href={`/pins/${id}`}>
		<div className="card-image">
			<figure className="image">
				<ReactImageFallback src={image_url} fallbackImage="/default-image.jpg" />
			</figure>
		</div>
		<div className="card-content">
			<div className="media" style={{alignItems: 'center'}}>
				<div className="media-left">
					<figure className="image is-32x32">
						<img src={poster_avatar} />
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p className="title is-5"><Link to={'/user/' + poster_id}>{poster_name}</Link></p>
					</div>
				</div>
			</div>

			<div className="content">
				{text}
				<br/>
				<small>{postTime.toLocaleTimeString()} - {postTime.toLocaleDateString()}</small>
				<br/>
				{editBox}
			</div>
		</div>
	</div>
};


const blankPin = {
	id: '',
	image_url: 'about:blank',
	text: '',
	post_time: 0,
	poster_name: '',
	poster_avatar: 'about:blank'
};

export default connect(
	({pinCache, user}) => ({pinCache, user}),
	dispatch => ({
		deletePin(id) {
			fetch('/api/pin/' + id, {
				method: 'DELETE',
				credentials: 'same-origin'
			}).then(res => {
				if(res.status === 200) {
					dispatch({type: 'UNCACHE_PIN'});
					browserHistory.push('/user');
				}
			});
		}
	}),
	({pinCache, user}, {deletePin}, {params}) => {
		const pin = pinCache[params.id] || blankPin;
		
		return {
			pin,
			isOwner: user.id && user.id === pin.poster_id,
			deletePin
		};
	}
)(PinPage);
