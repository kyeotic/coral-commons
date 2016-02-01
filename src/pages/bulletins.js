import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import mapToKeyedList from 'util/mapToKeyedList'
import residents from 'residents/actions'

@connect(state => ({
}), {  })
export default class Bulletins extends Component {
	render() {
		return (
			<div>
				<div className={"page-header"}>
					<h1>Bulletins
					</h1>
				</div>
			</div>
		)
	}
}