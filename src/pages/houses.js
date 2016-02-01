import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid } from 'react-bootstrap'

import { createHouse, toggleCreateHouse } from 'houses/actions'
import ToggleButtonInput from 'components/toggleButtonInput'

function transformMapToKeyedList(obj) {
	return Object.keys(obj).map(key => Object.assign({id:key}, obj[key]))
}

@connect(state => ({
	houses: transformMapToKeyedList(state.houses.get('items').toJS())
}), { createHouse, toggleCreateHouse })
export default class Houses extends Component {
	render() {
		let { createHouse } = this.props
		let houses = this.props.houses
		return (
			<div>
				<div className={"page-header"}>
					<h1>Houses
					<div className="pull-right">
						<ToggleButtonInput onSubmit={(number) => createHouse({number})}
										placeholder="House Number" />
					</div>
					</h1>
				</div>
				<Table striped hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Garage</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{houses.map(house=>{
						return (<tr>
							<td>{house.number}</td>
							<td>{house.garage}</td>
							<td>
								Temp
							</td>
						</tr>)
						})}
					</tbody>
				</Table>
			</div>
		)
	}
}