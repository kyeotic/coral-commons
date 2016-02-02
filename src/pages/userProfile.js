import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, ButtonInput, Row, Col, Glyphicon, Grid } from 'react-bootstrap'
import Firebase from 'util/firebase'
import toast from 'util/toast'
import { changeEmail, changePassword } from 'auth/actions'

@connect(state => ({
	email: state.auth.get('email'),
	user: state.users.get('items').get(state.auth.get('userId')),
	authRole: state.auth.get('userRole')
}), { changeEmail, changePassword })
export default class UserProfile extends Component {
	constructor(...props) {
		super(...props)
		this.state = {
			newEmail: '',
			newEmailPassword: '',

			oldPassword: '',
			newPassword1: '',
			newPassword2: ''
		}
	}
	handleEmailUpdate = (e) => {
		e.preventDefault()

		this.props.changeEmail({
			oldEmail: this.props.email,
			newEmail: this.state.newEmail,
			password: this.state.newEmailPassword
		}).then(() => {
			this.setState({newEmail: '', newEmailPassword: ''})
		}).catch(error => {
			this.setState({newEmailPassword: ''})
		})
	}
	handlePasswordUpdate = (e) => {
		e.preventDefault()

		if (this.state.newPassword1 !== this.state.newPassword2) {
			toast.error('New passwords do not match')
			return
		}

		this.props.changePassword({
			email: this.props.email,
			oldPassword: this.state.oldPassword,
			newPassword: this.state.newPassword1
		}).then(() => {
			this.setState({oldPassword: ''})
			this.setState({newPassword1: ''})
			this.setState({newPassword2: ''})
		}).catch(error => {
			this.setState({oldPassword: ''})
			this.setState({newPassword1: ''})
			this.setState({newPassword2: ''})
		})
	}
	render() {
		let user = this.props.user;

		//User loads async, so just wait for it
		if (!user )return null;

		return (
			<div>
				<div className={"page-header"}>
					<h1>User Profile</h1>
				</div>

				<dl className={''}>
					<dt>Email</dt>
					<dd>{this.props.email}</dd>

					<dt>Role</dt>
					<dd>{user.role}</dd>
				</dl>
				<Grid fluid>
					<Row>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Change Email</h2>
							</div>
							<form onSubmit={this.handleEmailUpdate}>
								<Input type="text"
										label="New Email"
										placeholder="guy@test.com"
										value={this.state.newEmail}
										onChange={(e => this.setState({newEmail: e.target.value}))} />
								<Input type="password"
										label="Password"
										placeholder="password"
										value={this.state.newEmailPassword}
										onChange={(e => this.setState({newEmailPassword: e.target.value}))} />
								<ButtonInput type="submit">Update Email</ButtonInput>
							</form>
						</Col>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Change Password</h2>
							</div>
							<form onSubmit={this.handlePasswordUpdate}>
								<Input type="password"
										label="Old Password"
										placeholder="Old Password"
										value={this.state.oldPassword}
										onChange={(e => this.setState({oldPassword: e.target.value}))} />
								<Input type="password"
										label="New Password"
										placeholder="New Password"
										value={this.state.newPassword1}
										onChange={(e => this.setState({newPassword1: e.target.value}))} />
								<Input type="password"
										label="Repeat Password"
										placeholder="Repeat Password"
										value={this.state.newPassword2}
										onChange={(e => this.setState({newPassword2: e.target.value}))} />
								<ButtonInput type="submit">Update Password</ButtonInput>
							</form>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
//