import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import mapToKeyedList from 'util/mapToKeyedList'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonGroup  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import bulletins from 'bulletins/actions'
import Markdown from 'react-markdown'
import { routeActions } from 'react-router-redux'

@connect((state, props) => {
	let result = {
		userId: state.auth.get('userId')
	}

	if (props.params.id === 'new') {
		result.bulletin = {}
	} else {
		result.bulletin = mapToKeyedList(state.bulletins.get('items').toJS())
				.find(h => h.number === props.params.id || h.id === props.params.id)
	}
	

	return result
}, { create: bulletins.push, update: bulletins.update, navigate: routeActions.push })
export default class Bulletin extends Component {
	constructor(props, ...args) {
		super(props, ...args)
		this.state = {
			title: props.bulletin ? props.bulletin.title : '',
			content: props.bulletin ? props.bulletin.content : ''
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			title: nextProps.bulletin ? nextProps.bulletin.title : '',
			content: nextProps.bulletin ? nextProps.bulletin.content : ''
		})
	}
	save = () => {

		let promise

		if (this.props.bulletin.id) {
			promise = this.props.update({
				title: this.state.title,
				userId: this.props.userId,
				content: this.state.content
			}, this.props.bulletin.id)
		} else {
			promise = this.props.create({
				title: this.state.title,
				userId: this.props.userId,
				content: this.state.content
			})
		}

		promise.then(() => {
			this.props.navigate('/')
		})
	}

	render() {
		return (
			<Grid fluid>
				<Row>
					<Col sm={6}>
						<Input type="text"
								label="Title"
								placeholder="Bulletin Title"
								value={this.state.title}
								onChange={e => this.setState({title: e.target.value})} />
					</Col>
				</Row>
				<Input type="textarea"
								rows={8}
								label="Title"
								placeholder="Bulletin Title"
								value={this.state.content}
								onChange={e => this.setState({content: e.target.value})} />

				<Panel header={<h3>Preview</h3>}>
					<Markdown source={this.state.content} />
				</Panel>

				<Button type="button" bsStyle="primary" onClick={this.save}>Save</Button>
			</Grid>
		)
	}
}