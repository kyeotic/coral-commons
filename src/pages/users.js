import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonToolbar  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import users from 'users/actions'

@connect(state => ({
	users: mapToKeyedList(state.users.get('items').toJS()),
	residents: state.residents.get('items').toJS(),
	userRole: state.auth.get('userRole')
}), { update: users.update, remove: users.remove })
export default class Users extends Component {

	removeUser = (userId) => {
		//Maybe prompt?
		this.props.remove(userId)
	}

	renderUserRoles = (user) => {
		let authRole = this.props.userRole,
			userRole = user.role,
			update = this.props.update

		if (authRole !== 'Admin' && (userRole === 'Admin' || authRole !== 'Board Member'))
			return userRole

		let optionRoles = [
			<option value={'Board Member'}>Board Member</option>,
			<option value={'Verified'}>Verified</option>,
			<option value={'Unverified'}>Unverified</option>
		]

		if (authRole === 'Admin')
			optionRoles.unshift(<option value={'Admin'}>Admin</option>)

		return (
			<Input type="select"
					value={userRole}
					onChange={(e => update(Object.assign({}, user, {role: e.target.value})))}>
				{optionRoles}
			</Input>
		)
	}

	render() {
		let { users, update, remove, residents, userRole } = this.props
		return (
			<div>
				<div className={"page-header"}>
					<h1>Users</h1>
				</div>
				<Table striped hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Role</th>
							<th>Resident</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user=>{
						return (<tr>
							<td>{user.name}</td>
							<td>{ this.renderUserRoles(user)}</td>
							<td>{user.residentId && residents[user.residentId] ? residents[user.residentId].fullName : ''}</td>
							<td>
								<ButtonToolbar className="pull-right">
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeUser(user.id)}>
										<Glyphicon glyph="remove" />
									</Button>
								</ButtonToolbar>
							</td>
						</tr>)
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}