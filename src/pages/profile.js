import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
	
}))
export default class Profile extends Component {
	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
				{ routes}
			</Provider>
		);
	}
}