import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Panel, ButtonInput } from 'react-bootstrap';
import { updateEmail, updatePassword } from 'actions/auth';

@connect(state => {
    let auth = state.auth.toJS();
    return { email: auth.email, password: auth.password };
}, { updateEmail, updatePassword } )
export default class Login extends Component {
    update = (newState) => {
        console.log(newState);
    }
    handleLogin = (e) => {
        e.preventDefault();
        console.log('login')
    }
    register = () => {
        console.log('register')
    }
	render() {
        const { email, password } = this.props;
		return (
            <div className={'login-container'}>
                <div className={'login-box container'}>
                    <Panel bsStyle="primary" header={<h2>Coral Commons Sign In</h2>}>
                    <form onSubmit={this.handleLogin}>
                        <Input type="text"
                            placeholder={'name@domain.com'}
                            label={'Email Address'}
                            value={email}
                            onChange={(e) => this.props.updateEmail(e.target.value)} />
                        <Input type="password"
                            placeholder={'password'}
                            label={'Password'}
                            value={password}
                            onChange={(e) => this.props.updatePassword(e.target.value)} />
                        <div className={'pull-right'}>
                            <button type="submit" className={'btn btn-primary'}>Login</button>
                            <button type="button" onClick={this.register} className={'btn btn-default'}>Register</button>
                        </div>
                    </form>
                    </Panel>
                </div>
            </div>
		);
	}
}