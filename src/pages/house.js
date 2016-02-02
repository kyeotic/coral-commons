import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import residents from 'residents/actions'
import houses from 'houses/actions'

@connect((state, props) => {
	let house = state.houses.get('items').get(props.params.id)
	if (!house) 
		return { house: null }
	house.id = props.params.id

	let residents = state.residents.get('items').toJS()

	return { house, residents };
}, { update: houses.update, updateResident: residents.update })
export default class House extends Component {

	render() {
		let { update, house, residents } = this.props

		if (!house) return null

		residents = mapToKeyedList(residents)

		return (
			<div>
				<div className={"page-header"}>
					<h1>{house.number}</h1>
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
							<Input type="text"
									value={resident.fullName}
									label="Full Name"
									placeholder="Full Name"
									onChange={e => update(Object.assign({}, resident, {fullName: e.target.value}))} />
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<div className={"page-header"}>
								<h2>Residents
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
					</Row>
				</Grid>

			</div>
		)
	}
}