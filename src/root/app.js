import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { subscribeToFirebase } from 'util/firebase'
import houses from 'houses/actions'
import users from 'users/actions'
import residents from 'residents/actions'

import NavBar from 'navigation/navBar'
import LoginForm from 'auth/loginForm'
import Unverified from 'pages/unverified'

@connect(state => ({
	isLoggedIn: state.auth.get('isLoggedIn'),
	authRole: state.auth.get('userRole')
}))
export default class App extends Component {
	componentWillMount() {
		subscribeToFirebase(this.props.dispatch, [
			houses,
			users,
			residents
		])
	}
	render() {
		if (!this.props.isLoggedIn) 
			return <LoginForm />
		if (this.props.authRole === null) return null
		if (this.props.authRole === 'Unverified')
			return <Unverified />

		return (
			<div className={"container"}>
				<NavBar />
				{this.props.children}
			</div>
		)
	}
}