import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonToolbar  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import residents from 'residents/actions'
import toast from 'util/toast'
import dynamicSort from 'util/dynamicSort'
import objectValues from 'util/objectValues'

@connect(state => {
	let residents = mapToKeyedList(state.residents.get('items').toJS())
				.map(resident => {
					if (resident.houseId)
						resident.house = state.houses.get('items').toJS()[resident.houseId]
					return resident
				})
	return {residents, isManager: state.auth.get('isManager')}
}, { createResident: residents.push, removeResident: residents.remove })
export default class Residents extends Component {
	onAddResident = (newFullName) => {
		let { createResident } = this.props

		if (this.props.residents.find(r => r.fullName === newFullName)) {
			toast.error('Resident with this name exists')
			return
		}

		createResident({fullName: newFullName})
	}
	render() {
		let { createResident, removeResident, isManager } = this.props
		let residents = this.props.residents.sort(dynamicSort('fullName'))
		return (
			<div>
				<div className={"page-header"}>
					<h1>Residents
					{isManager ?
					<div className="pull-right">
						<ToggleButtonInput onSubmit={(fullName) => this.onAddResident(fullName)}
										placeholder="Full Name" />
					</div> : null}
					</h1>
				</div>
				<Table striped hover responsive >
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>House</th>
							<th>Phone</th>
							<th>Email</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{residents.map(resident=>{
						return (<tr key={resident.id}>
							<td>{resident.fullName}</td>
							<td>{resident.type}</td>
							<td>{resident.house ? resident.house.number : null}</td>
							<td>{resident.phones ? objectValues(resident.phones).join(', ') : null}</td>
							<td>{resident.emails ? objectValues(resident.emails).join(', ') : null}</td>
							<td>
								<ButtonToolbar className="pull-right">
									<Link className={'btn btn-default btn-sm'} to={'/residents/' + resident.id}>
										<Glyphicon glyph="edit" />
									</Link>
									{isManager ? 
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeResident(resident.id)}>
										<Glyphicon glyph="remove" />
									</Button> : null}
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