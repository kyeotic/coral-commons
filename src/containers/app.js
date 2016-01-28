import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from 'actions/index';
import firebase from 'firebase';

@connect(state => ({ state }),
	{ action }
)
export default class App extends Component {
    static propTypes = {
        state: PropTypes.object.isRequired,
        action: PropTypes.func.isRequired
    }
	render() {
	    const { action } = this.props;
		return (
		    <div>{'app'}
		    </div>
		);
	}
}