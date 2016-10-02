import React from 'react';
import {Link} from 'react-router';
import ReactImageFallback from 'react-image-fallback';


const PinCard = ({id, image_url, text, post_time, poster_name, poster_avatar}) => {
	const postTime = new Date(post_time);

	return <Link className="pin-card card" to={`/pin/${id}`}>
		<div className="card-image">
			<figure className="image">
				<ReactImageFallback src={image_url} fallbackImage="/default-image.jpg" />
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
	</Link>
};

export default PinCard;
