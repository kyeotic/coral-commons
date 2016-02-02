import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonToolbar  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import houses from 'houses/actions'
import toast from 'util/toast'
import dynamicSort from 'util/dynamicSort'

@connect(state => ({
	houses: mapToKeyedList(state.houses.get('items').toJS()),
	residents: state.residents.get('items').toJS(),
	isManager: state.auth.get('isManager')
}), { createHouse: houses.push, removeHouse: houses.remove })
export default class Houses extends Component {

	onAddHouse = (newNumber) => {
		let { createHouse } = this.props

		if (this.props.houses.find(h => h.number === newNumber)) {
			toast.error('House number already exists')
			return
		}

		createHouse({number})
	}

	getResidents = (house) => {
		let { residents } = this.props
		return house.residents ? Object.keys(house.residents)
								.filter(k => residents[k])
								.map(k => residents[k].fullName).join(', ') : ''
	}

	render() {
		let { removeHouse, isManager } = this.props
		let houses = this.props.houses.sort(dynamicSort('number'))
		return (
			<div>
				<div className={"page-header"}>
					<h1>Houses
					{isManager ?
						<div className="pull-right">
							<ToggleButtonInput onSubmit={(number) => this.onAddHouse(number)}
											placeholder="House Number" />
						</div> : null
					}
					</h1>
				</div>
				<Table striped hover responsive >
					<thead>
						<tr>
							<th>#</th>
							<th>Garage</th>
							<th>Residents</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{houses.map(house=>{
						return (<tr key={house.id}>
							<td>{house.number}</td>
							<td>{house.garage}</td>
							<td>
								{this.getResidents(house)}
							</td>
							<td>
								<ButtonToolbar className="pull-right">
									<Link className={'btn btn-default btn-sm'} to={'/houses/' + house.number}>
										<Glyphicon glyph="edit" />
									</Link>
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeHouse(house.id)}>
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