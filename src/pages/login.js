import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

export default class Login extends Component {
    static propTypes = {
        
    }
    constructor(props, ...args) {
        super(props, ...args);
        this.state = {};
    }
	render() {
		return (
            <div className={'login-container'}>
                <div className={'login-box container'}>
                    Login
                </div>
            </div>
		);
	}
}