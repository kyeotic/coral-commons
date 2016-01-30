import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAuth } from 'services/firebase'

import NavBar from 'components/navBar'
import Login from 'pages/login'

@connect(state => ({
	isLoggedIn: state.auth.get('isLoggedIn')	
}))
export default class App extends Component {
	componentWillMount() {
		getAuth(this.props.dispatch)
	}
	render() {
		if (!this.props.isLoggedIn) 
			return <Login />

		return (
			<div className={"container"}>
				<NavBar />
				App
				{this.props.children}
			</div>
		)
	}
}