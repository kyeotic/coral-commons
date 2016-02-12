import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import residents from 'residents/actions'
import houses from 'houses/actions'
import users from 'users/actions'
import dynamicSort from 'util/dynamicSort'

import phoneFormat from 'phone-formatter'

@connect((state, props) => {
	let resident = state.residents.get('items').get(props.params.id)
	if (!resident) 
		return { resident: null }
	resident.id = props.params.id

	let houses = state.houses.get('items').toJS()
	let users = state.users.get('items').toJS()
	let isManager = state.auth.get('isManager')
	let isOwningUser = resident.userId === state.auth.get('userId')

	return {resident, houses, users, isManager, isOwningUser};
}, { update: residents.update, updateHouse: houses.update, updateUserResident: users.updateUserResident })
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
		this.props.updateUserResident({userId: newUserId, residentId: this.props.resident.id})
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
		let { update, resident, houses, users, isManager, isOwningUser } = this.props
		let canUpdate = isManager || isOwningUser

		if (!resident) return null

		houses = mapToKeyedList(houses)
		users = mapToKeyedList(users)
		let phones = mapToKeyedList(resident.phones)
		let emails = mapToKeyedList(resident.emails)

		houses.sort(dynamicSort("number"))
		users.sort(dynamicSort("name"))

		let residentTypes = ['Owner', 'Renter', 'Board Member']

		return (
			<div>
				<div className={"page-header"}>
					<h1>{resident.fullName}</h1>
				</div>

				<Grid fluid>
					<Row>
						<Col sm={5}>
							<Input type="text" disabled={!canUpdate}
									value={resident.fullName}
									label="Full Name"
									placeholder="Full Name"
									onChange={e => update(Object.assign({}, resident, {fullName: e.target.value}))} />
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="select" disabled={!isManager}
									value={resident.houseId || ''}
									label="House"
									onChange={e => this.onUpdateHouse(e.target.value)}>
									<option value={''}>Select a house</option>
								{houses.map(house => {
									return <option value={house.id} key={house.id}>{house.number}</option>
								})}
							</Input>
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="select" disabled={!isManager}
									value={resident.userId || ''}
									label="User"
									onChange={e => this.onUpdateUser(e.target.value)}>
									<option value={''}>Select a user</option>
								{users.map(user => {
									return <option value={user.id} key={user.id}>{user.name}</option>
								})}
							</Input>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Phones
									{ canUpdate ? 
									<div className="pull-right">
										<ToggleButtonInput onSubmit={(newPhoneNumber) => this.onAddPhone(newPhoneNumber)}
														placeholder="Phone Number" />
									</div> : null
									}
								</h2>
							</div>
							<Table striped hover>
								<tbody>
									{phones.map(phone=>{
									return (<tr key={phone.id}>
										<td>{phone.value}</td>
										<td>
											{ canUpdate ? 
											<div className="pull-right">
												<Button bsStyle="danger" bsSize="small"
													onClick={() => this.onRemovePhone(phone.id)}>
													<Glyphicon glyph="remove" />
												</Button>
											</div> : null
											}
										</td>
									</tr>)
									})}
								</tbody>
							</Table>
						</Col>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Email Addresses
									{ canUpdate ? 
									<div className="pull-right">
										<ToggleButtonInput onSubmit={(newEmail) => this.onAddEmail(newEmail)}
														placeholder="Email Address" />
									</div> : null
									}
								</h2>
							</div>
							<Table striped hover>
								<tbody>
									{emails.map(email=>{
									return (<tr key={email.id}>
										<td>{email.value}</td>
										<td>
											{ canUpdate ? 
											<div className="pull-right">
												<Button bsStyle="danger" bsSize="small"
													onClick={() => this.onRemoveEmail(email.id)}>
													<Glyphicon glyph="remove" />
												</Button>
											</div> : null
											}
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