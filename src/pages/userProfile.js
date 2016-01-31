import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
	email: state.auth.get('email'),
	user: state.users.get(state.auth.get('userId'))
}))
export default class UserProfile extends Component {
	render() {
		let user = this.props.user;

		//User loads async, so just wait for it
		if (!user )return null;

		return (
			<div>
				<p>{this.props.email} </p>
				<p>{user.name}</p>
				<p>{user.role}</p>
			</div>
		);
	}
}
//