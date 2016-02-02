import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import houses from 'houses/actions'

@connect(state => ({
	houses: mapToKeyedList(state.houses.get('items').toJS())
}), { createHouse: houses.push, removeHouse: houses.remove })
export default class Houses extends Component {
	render() {
		let { createHouse, removeHouse } = this.props
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
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{houses.map(house=>{
						return (<tr>
							<td>{house.number}</td>
							<td>{house.garage}</td>
							<td>
								<ButtonGroup className="pull-right">
									<Button bsStyle="danger" bsSize="small"
										onClick={() => removeHouse(house.id)}>
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