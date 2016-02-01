import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import residents from 'residents/actions'

@connect(state => ({
	residents: mapToKeyedList(state.residents.get('items').toJS())
				.map(resident => {
					if (resident.houseId)
						resident.house = state.houses.get(resident.houseId).toJS()
					return resident
				})
}), { createResident: residents.push, removeResident: residents.remove })
export default class Residents extends Component {
	render() {
		let { createResident, removeResident } = this.props
		let residents = this.props.residents
		return (
			<div>
				<div className={"page-header"}>
					<h1>Residents
					<div className="pull-right">
						<ToggleButtonInput onSubmit={(fullName) => createResident({fullName})}
										placeholder="Full Name" />
					</div>
					</h1>
				</div>
				<Table striped hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>House</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{residents.map(resident=>{
						return (<tr>
							<td>{resident.fullName}</td>
							<td>{resident.house ? resident.house.number : null}</td>
							<td>
								<ButtonGroup className="pull-right">
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeResident(resident.id)}>
										<Glyphicon glyph="remove" />
									</Button>
								</ButtonGroup>
							</td>
						</tr>)
						})}
					</tbody>
				</Table>
			</div>
		)
	}
}