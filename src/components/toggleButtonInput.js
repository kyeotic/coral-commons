import React, { Component, PropTypes } from 'react'
import { Input, Glyphicon, Button } from 'react-bootstrap'

export default class ToggleButtonInput extends Component {
	static PropTypes = {
		onSubmit: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired
	}
	constructor(...props) {
		super(...props)
		this.state = {
			isOpen: false
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.refs.input.getValue())
		this.setState({isOpen: false})
	}
	toggleForm = () => {
		this.setState({isOpen: !this.state.isOpen})
	}
	handleKeyPress = (e) => {
		if (e.key === 'Escape')
			this.setState({isOpen: false})
	}
	render() {
		let { toggleCreateHouse } = this.props
		let houses = this.props.houses
		return (
			<form className={'form-inline'}  onSubmit={this.handleSubmit}>
				{!this.state.isOpen ? 
				<Button onClick={this.toggleForm} bsStyle="primary" >
					<Glyphicon glyph={'plus'} /> Add New
				</Button> :
				<span>
				 <Input type="text" 
				 		ref="input"
				 		onKeyDown={this.handleKeyPress}
				 		placeholder={this.props.placeholder}
				 		autoFocus />
				 <Button type="submit" bsStyle="primary" >
						<Glyphicon glyph={'plus'} /> Add New
					</Button>
					</span>
				}
			</form>
		)
	}
}