import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from 'actions/index';
import firebase from 'firebase';

import NavBar from 'components/navBar';

export default class App extends Component {
	render() {
		return (
			<div className={"container"}>
				<NavBar />
				App
				{this.props.children}
			</div>
		);
	}
}