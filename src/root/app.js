import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from 'actions/index';
import firebase from 'firebase';

export default class App extends Component {
	render() {
		return (
			<div>
				App
				{this.props.children}
			</div>
		);
	}
}