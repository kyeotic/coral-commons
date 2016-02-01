import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import residents from 'residents/actions'

@connect((state, props) => {
	let resident = state.residents.get('items').get(props.params.id)
	if (!resident) return { resident: null }
	if (resident.houseId)
		resident.house = state.houses.get(resident.houseId).toJS()
	return {resident};
}, { update: residents.update })
export default class Resident extends Component {
	render() {
		let { update } = this.props
		let resident = this.props.resident

		if (!resident) return null

		return (
			<div>
				<div className={"page-header"}>
					<h1>{resident.fullName}</h1>
				</div>
			</div>
		)
	}
}