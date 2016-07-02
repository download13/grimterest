import {registerComponent} from 'prux';


registerComponent('pin-card', {
	props: {pin: {}},
	render({h, props: {pin}}) {
		const {
			id,
			imageUrl,
			text,
			posterName,
			posterAvatar
		} = pin;
		const postTime = new Date(pin.postTime);

		return <a class="card" href={`/pins/${id}`}>
			<div class="card-image">
				<figure class="image">
					<img src={imageUrl}/>
				</figure>
			</div>
			<div class="card-content">
				<div class="media" style="align-items:center;">
					<div class="media-left">
						<figure class="image is-32x32">
							<img src={posterAvatar}/>
						</figure>
					</div>
					<div class="media-content">
						<div class="content">
							<p class="title is-5">{posterName}</p>
						</div>
					</div>
				</div>

				<div class="content">
					{text}
					<small>{postTime.toLocaleTimeString()} - {postTime.toLocaleDateString()}</small>
				</div>
			</div>
		</a>
	}
});
