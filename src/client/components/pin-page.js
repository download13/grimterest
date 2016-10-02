import React from 'react';
import {connect} from 'react-redux';


const PinPage = ({pin}) => {
	const {id, image_url, text, post_time, poster_name, poster_avatar} = pin;

	const postTime = new Date(post_time);

	return <div className="pin-page card" href={`/pins/${id}`}>
		<div className="card-image">
			<figure className="image">
				<img src={image_url}/>
			</figure>
		</div>
		<div className="card-content">
			<div className="media" style={{alignItems: 'center'}}>
				<div className="media-left">
					<figure className="image is-32x32">
						<img src={poster_avatar}/>
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p className="title is-5">{poster_name}</p>
					</div>
				</div>
			</div>

			<div className="content">
				{text}
				<br/>
				<small>{postTime.toLocaleTimeString()} - {postTime.toLocaleDateString()}</small>
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
	({pinCache}) => ({pinCache}),
	() => ({}),
	({pinCache}, _, {params}) => ({pin: pinCache[params.id] || blankPin})
)(PinPage);
