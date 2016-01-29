import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from 'actions/index';
import firebase from 'firebase';

import NavBar from 'components/navBar';
import Login from 'pages/login';

@connect(state => ({
	isLoggedIn: state.auth.toJS().isLoggedIn
}))
export default class App extends Component {
	render() {
		if (!this.props.isLoggedIn) 
			return <Login />;

		return (
			<div className={"container"}>
				<NavBar />
				App
				{this.props.children}
			</div>
		);
	}
}