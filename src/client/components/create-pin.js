import {registerComponent} from 'prux';


registerComponent('create-pin', {
	props: {},
	render({h, props}) {
		return <div>
			<div class="control">
				<input class="input" placeholder="Image URL" type="url"/>
			</div>
			<div class="control">
				<textarea class="textarea" placeholder="Description"/>
			</div>
			<div class="control">
				<button class="button is-primary">Create</button>
			</div>
		</div>;
	}
});
