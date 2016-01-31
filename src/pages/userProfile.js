import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, ButtonInput } from 'react-bootstrap'

@connect(state => ({
	email: state.auth.get('email'),
	user: state.users.get(state.auth.get('userId')),
	authRole: state.auth.get('userRole')
}))
export default class UserProfile extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
	}
	render() {
		let user = this.props.user;

		//User loads async, so just wait for it
		if (!user )return null;

		return (
			<div>
				<p>{this.props.email} </p>
				<p>{user.role}</p>
				<form onSubmit={this.handleSubmit} className={"form-inline"}>

				</form>
			</div>
		);
	}
}
//