import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import residents from 'residents/actions'
import houses from 'houses/actions'
import users from 'users/actions'

import phoneFormat from 'phone-formatter'

@connect((state, props) => {
	let resident = state.residents.get('items').get(props.params.id)
	if (!resident) 
		return { resident: null }
	resident.id = props.params.id

	let houses = state.houses.get('items').toJS()
	let users = state.users.get('items').toJS()

	return {resident, houses, users};
}, { update: residents.update, updateHouse: houses.update, updateUser: users.update })
export default class Resident extends Component {

	onUpdateHouse = (newHouseId) => {
		newHouseId = newHouseId === '' ? null : newHouseId
		let { update, resident, houses, updateHouse } = this.props
		
		//Already mapped to a house, remove the old one
		if (resident.houseId) {
			let house = houses[resident.houseId]
			if (house.residents) {
				delete house.residents[resident.id]
				updateHouse(house, resident.houseId)
			}
		}

		//Map new house
		if (newHouseId) {
			let newHouse = houses[newHouseId]
			if (!newHouse.residents) {
				newHouse.residents = {}
			}
			newHouse.residents[resident.id] = true
			updateHouse(newHouse, newHouseId)
		}		

		resident.houseId = newHouseId
		update(resident)
	}

	onUpdateUser = (newUserId) => {
		newUserId = newUserId === '' ? null : newUserId
		let { update, resident, users, updateUser } = this.props

		//Already mapped to a user, remove the old one
		if (resident.userId) {
			let user = users[resident.userId]
			if (user.residentId) {
				delete user.residentId
				updateUser(user, resident.userId)
			}
		}

		//Map new User
		if (newUserId) {
			let newUser = users[newUserId]
			newUser.residentId = resident.id
			updateUser(newUser, newUserId)
		}

		resident.userId = newUserId
		update(resident)
	}

	onAddPhone = (newPhoneNumber) => {
		let { update, resident } = this.props

		if (!resident.phones) {
			resident.phones = {}
		}

		resident.phones[residents.generateChildId()] = phoneFormat.format(newPhoneNumber, '(NNN) NNN-NNNN')
		update(resident)
	}

	onRemovePhone = (phoneId) => {
		let { update, resident } = this.props

		delete resident.phones[phoneId]
		update(resident)
	}

	onAddEmail = (newEmail) => {
		let { update, resident } = this.props

		if (!resident.emails) {
			resident.emails = {}
		}

		resident.emails[residents.generateChildId()] = newEmail
		update(resident)
	}

	onRemoveEmail = (emailId) => {
		let { update, resident } = this.props

		delete resident.emails[emailId]
		update(resident)
	}

	render() {
		let { update, resident, houses, users } = this.props

		if (!resident) return null

		houses = mapToKeyedList(houses)
		users = mapToKeyedList(users)
		let phones = mapToKeyedList(resident.phones)
		let emails = mapToKeyedList(resident.emails)

		let residentTypes = ['Owner', 'Renter', 'Board Member']

		return (
			<div>
				<div className={"page-header"}>
					<h1>{resident.fullName}</h1>
				</div>

				<Grid fluid>
					<Row>
						<Col sm={5}>
							<Input type="text"
									value={resident.fullName}
									label="Full Name"
									placeholder="Full Name"
									onChange={e => update(Object.assign({}, resident, {fullName: e.target.value}))} />
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="select"
									value={resident.houseId || ''}
									label="House"
									onChange={e => this.onUpdateHouse(e.target.value)}>
									<option value={''}>Select a house</option>
								{houses.map(house => {
									return <option value={house.id}>{house.number}</option>
								})}
							</Input>
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="select"
									value={resident.type || ''}
									label="Type"
									onChange={e =>  update(Object.assign({}, resident, {type: e.target.value}))}>
									{resident.type ? null : <option value={''}>Select a type</option>}
								{residentTypes.map(type => {
									return <option value={type}>{type}</option>
								})}
							</Input>
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="select"
									value={resident.userId || ''}
									label="User"
									onChange={e => this.onUpdateUser(e.target.value)}>
									<option value={''}>Select a user</option>
								{users.map(user => {
									return <option value={user.id}>{user.name}</option>
								})}
							</Input>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Phones
									<div className="pull-right">
										<ToggleButtonInput onSubmit={(newPhoneNumber) => this.onAddPhone(newPhoneNumber)}
														placeholder="Phone Number" />
									</div>
								</h2>
							</div>
							<Table striped hover>
								<tbody>
									{phones.map(phone=>{
									return (<tr>
										<td>{phone.value}</td>
										<td>
											<div className="pull-right">
												<Button bsStyle="danger" bsSize="small"
													onClick={() => this.onRemovePhone(phone.id)}>
													<Glyphicon glyph="remove" />
												</Button>
											</div>
										</td>
									</tr>)
									})}
								</tbody>
							</Table>
						</Col>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Email Addresses
									<div className="pull-right">
										<ToggleButtonInput onSubmit={(newEmail) => this.onAddEmail(newEmail)}
														placeholder="Email Address" />
									</div>
								</h2>
							</div>
							<Table striped hover>
								<tbody>
									{emails.map(email=>{
									return (<tr>
										<td>{email.value}</td>
										<td>
											<div className="pull-right">
												<Button bsStyle="danger" bsSize="small"
													onClick={() => this.onRemoveEmail(email.id)}>
													<Glyphicon glyph="remove" />
												</Button>
											</div>
										</td>
									</tr>)
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}