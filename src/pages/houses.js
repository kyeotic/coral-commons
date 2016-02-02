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
	houses: mapToKeyedList(state.houses.get('items').toJS())
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

	render() {
		let { removeHouse } = this.props
		let houses = this.props.houses.sort(dynamicSort('number'))
		return (
			<div>
				<div className={"page-header"}>
					<h1>Houses
					<div className="pull-right">
						<ToggleButtonInput onSubmit={(number) => this.onAddHouse(number)}
										placeholder="House Number" />
					</div>
					</h1>
				</div>
				<Table striped hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Garage</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{houses.map(house=>{
						return (<tr>
							<td>{house.number}</td>
							<td>{house.garage}</td>
							<td>
								<ButtonToolbar className="pull-right">
									<Link className={'btn btn-default btn-sm'} to={'/houses/' + house.id}>
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