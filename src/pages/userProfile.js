import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
	email: state.auth.get('email'),
	user: state.users.get(state.auth.get('userId'))
}))
export default class UserProfile extends Component {
	render() {
		return (
			<div>
				{this.props.email}
				{this.props.user.name}
			</div>
		);
	}
}