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
	authRole: state.auth.get('userRole')
}), { update: users.update, remove: users.remove })
export default class Users extends Component {

	removeUser = (userId) => {
		//Maybe prompt?
		this.props.remove(userId)
	}

	renderUserRoles = (user) => {
		let authRole = this.props.authRole,
			userRole = user.role,
			update = this.props.update

		if (authRole !== 'Admin' && (userRole === 'Admin' || authRole !== 'Board Member'))
			return userRole

		let optionRoles = [
			<option key={'Board Member'} value={'Board Member'}>Board Member</option>,
			<option key={'Verified'} value={'Verified'}>Verified</option>,
			<option key={'Unverified'} value={'Unverified'}>Unverified</option>
		]

		if (authRole === 'Admin')
			optionRoles.unshift(<option key={'Admin'} value={'Admin'}>Admin</option>)

		return (
			<Input type="select" bsSize="small"
					value={userRole}
					onChange={(e => update(Object.assign({}, user, {role: e.target.value})))}>
				{optionRoles}
			</Input>
		)
	}

	render() {
		let { users, update, remove, residents, authRole } = this.props
		return (
			<div>
				<div className={"page-header"}>
					<h1>Users</h1>
				</div>
				<Table striped hover responsive >
					<thead>
						<tr>
							<th>Name</th>
							<th>Role</th>
							<th>Resident</th>
							{authRole === 'Admin' || authRole === 'Board Member' ?
							 <th className="text-right">Actions</th> : null}
						</tr>
					</thead>
					<tbody>
						{users.map(user=>{
						return (<tr key={user.id}>
							<td>{user.name}</td>
							<td>{ this.renderUserRoles(user)}</td>
							<td>{user.residentId && residents[user.residentId] ? residents[user.residentId].fullName : ''}</td>
							<td>
								{authRole === 'Admin' || (authRole === 'Board Member' && ['Verified', 'Unverfied'].indexOf(user.role) !== -1) ?
									<ButtonToolbar className="pull-right">
										<Button bsStyle="danger" bsSize="small"
											onClick={() => this.removeUser(user.id)}>
											<Glyphicon glyph="remove" />
										</Button>
									</ButtonToolbar>: null
								} 
								
							</td>
						</tr>)
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}