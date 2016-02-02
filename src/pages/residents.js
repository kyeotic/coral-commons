import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonToolbar  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import residents from 'residents/actions'

@connect(state => {
	let residents = mapToKeyedList(state.residents.get('items').toJS())
				.map(resident => {
					if (resident.houseId)
						resident.house = state.houses.get('items').toJS()[resident.houseId]
					return resident
				})
	return {residents}
}, { createResident: residents.push, removeResident: residents.remove })
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
							<th>Type</th>
							<th>House</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{residents.map(resident=>{
						return (<tr>
							<td>{resident.fullName}</td>
							<td>{resident.type}</td>
							<td>{resident.house ? resident.house.number : null}</td>
							<td>
								<ButtonToolbar className="pull-right">
									<Link className={'btn btn-default btn-sm'} to={'/residents/' + resident.id}>
										<Glyphicon glyph="edit" />
									</Link>
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeResident(resident.id)}>
										<Glyphicon glyph="remove" />
									</Button>
								</ButtonToolbar>
							</td>
						</tr>)
						})}
					</tbody>
				</Table>
			</div>
		)
	}
}