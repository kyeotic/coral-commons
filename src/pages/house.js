import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import residents from 'residents/actions'
import houses from 'houses/actions'
import dynamicSort from 'util/dynamicSort'

@connect((state, props) => {
	let house = mapToKeyedList(state.houses.get('items').toJS())
				.find(h => h.number === props.params.id || h.id === props.params.id)
	if (!house) 
		return { house: null }

	let residents = state.residents.get('items').toJS()

	return { house, residents };
}, { update: houses.update, updateResident: residents.update })
export default class House extends Component {

	handleAddResident = (e) => {
		let residentId = this.refs.input.getValue()
		if (!residentId)
			return
		this.onAddResident(residentId)
	}

	onAddResident = (residentId) => {
		residentId = residentId === '' ? null : residentId
		let { update, residents, house, updateResident } = this.props
		
		let resident = residents[residentId]
		resident.houseId = house.id
		updateResident(resident, residentId)			

		if (!house.residents) {
			house.residents = {}
		}

		house.residents[residentId] = true
		update(house)
	}

	onRemoveResident = (residentId) => {
		residentId = residentId === '' ? null : residentId
		let { update, residents, house, updateResident } = this.props
		
		let resident = residents[residentId]
		resident.houseId = null
		updateResident(resident, residentId)			

		delete house.residents[residentId]
		update(house)
	}

	render() {
		let { update, house, residents } = this.props

		if (!house) return null

		residents = mapToKeyedList(residents)
		residents.sort(dynamicSort("fullName"))

		return (
			<div>
				<div className={"page-header"}>
					<h1>{house.number}</h1>
				</div>

				<Grid fluid>
					<Row>
						<Col sm={5}>
							<Input type="text" disabled
									value={house.number}
									label="House Number"
									placeholder="House Number"
									onChange={e => update(Object.assign({}, house, {number: e.target.value}))} />
						</Col>
					</Row>
					<Row>
						<Col sm={5}>
							<Input type="text"
									value={house.garage}
									label="Garage"
									placeholder="West-3"
									onChange={e => update(Object.assign({}, house, {garage: e.target.value}))} />
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Residents
									<div className="pull-right form-inline">
										<Input type="select" ref="input">
											<option value={''}>Add a resident</option>
											{residents
												.filter(resident => (house.residents || {})[resident.id] !== true)
												.map(resident => <option value={resident.id}>{resident.fullName}</option>)
											}
										</Input>
									 	<Button bsStyle="primary"
									 			onClick={this.handleAddResident}>
											<Glyphicon glyph={'plus'} /> Add New
										</Button>
									</div>
								</h2>
							</div>
							<Table striped hover>
								<tbody>
									{residents
										.filter(resident => (house.residents || {})[resident.id] === true)
										.map(resident=>{
									return (<tr>
										<td>{resident.fullName}</td>
										<td>
											<div className="pull-right">
												<Button bsStyle="danger" bsSize="small"
													onClick={() => this.onRemoveResident(resident.id)}>
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