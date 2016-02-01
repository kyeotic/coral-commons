import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import residents from 'residents/actions'
import houses from 'houses/actions'

@connect((state, props) => {
	let resident = state.residents.get('items').get(props.params.id)
	if (!resident) 
		return { resident: null }
	resident.id = props.params.id

	let houses = state.houses.get('items').toJS()

	return {resident, houses};
}, { update: residents.update, updateHouse: houses.update })
export default class Resident extends Component {

	onUpdateHouse = (value) => {
		value = value === '' ? null : value
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
		if (value) {
			let newHouse = houses[value]
			if (!newHouse.residents) {
				newHouse.residents = {}
			}
			newHouse.residents[resident.id] = true
			updateHouse(newHouse, value)
		}		

		resident.houseId = value
		update(resident)
	}
	render() {
		let { update, resident, houses, updateHouse } = this.props

		houses = mapToKeyedList(houses)

		if (!resident) return null

		return (
			<div>
				<div className={"page-header"}>
					<h1>{resident.fullName}</h1>
				</div>

				<Grid>
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
								{[<option value={''}>Select a house</option>]
								.concat(houses.map(house => {
									return <option value={house.id}>{house.number}</option>
								}))}
							</Input>
						</Col>
					</Row>
				</Grid>

				<div className={"page-header"}>
					<h2>Phones</h2>
				</div>

			</div>
		)
	}
}