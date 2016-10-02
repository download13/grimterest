import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';


const CreatePin = ({image_url, text, setDraftText, setDraftImage, submitDraft}) => {
	return <div className="create-pin">
		<div style={{width: 500}}>
			<div className="control">
				<input className="input" placeholder="Image URL" type="url" onChange={e => setDraftImage(e.target.value)} />
			</div>
			<div className="control">
				<textarea className="textarea" style={{minHeight: 60, maxHeight: 150}} placeholder="Description" onChange={e => setDraftText(e.target.value)}/>
			</div>
			<div className="control">
				<button className="button is-primary" onClick={() => submitDraft(image_url, text)}>Create</button>
			</div>
		</div>
	</div>
};

export default connect(
	({draftPin}) => ({...draftPin}),
	dispatch => ({
		setDraftText: text => dispatch({type: 'SET_DRAFT_TEXT', payload: text}),
		setDraftImage: url => dispatch({type: 'SET_DRAFT_IMAGE', payload: url}),
		submitDraft: (image_url, text) => {
			fetch('/api/pin', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({image_url, text})
			}).then(res => {
				if(res.status === 201) {
					dispatch({type: 'CLEAR_DRAFT'});
					browserHistory.push('/');
				} else {
					console.error(res.status);
					alert('Error');
					// TODO: Add error field to form
				}
			})
		}
	})
)(CreatePin);
