import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon } from 'react-bootstrap'

@connect(state => {
	return state.houses.toJS()
}, { })
export default class Houses extends Component {
	render() {
		let houses = this.props.houses || []
		return (
			<div>
				<div className={"page-header"}>
					<h1>Houses <Button bsStyle={'primary'} bsSize={'small'}><Glyphicon glyph={'plus'} /> Add New</Button></h1>
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
						<tr>
							<td>{house.number}</td>
							<td>{house.garage}</td>
							<td>
								Temp
							</td>
						</tr>
						})}
					</tbody>
				</Table>
			</div>
		)
	}
}