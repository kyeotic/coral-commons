import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from 'actions/auth'
import { toggleCollapse } from 'actions/navigation'
import firebase from 'firebase'

import NavBar from 'components/navBar'
import Login from 'pages/login'

@connect(state => ({
	isLoggedIn: state.auth.get('isLoggedIn'),
	isCollapseExpanded: state.navigation.get('isCollapseExpanded')
}), { logout, toggleCollapse })
export default class App extends Component {
	render() {
		if (!this.props.isLoggedIn) 
			return <Login />

		return (
			<div className={"container"}>
				<NavBar logout={this.props.logout} 
					toggleCollapse={this.props.toggleCollapse} 
					isCollapseExpanded={this.props.isCollapseExpanded} />
				App
				{this.props.children}
			</div>
		)
	}
}