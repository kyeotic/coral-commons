import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, ButtonInput } from 'react-bootstrap'
import { 
    updateEmail, updatePassword, updateName,
    toggleRegister, registerUser, loginUser
} from 'actions/auth'

@connect(state => {
    return state.auth.toJS()
}, { updateEmail, updatePassword, updateName, toggleRegister, registerUser, loginUser } )
export default class Login extends Component {
    update = (newState) => {
        console.log(newState)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.showRegister)
            this.props.registerUser(this.props.email, this.props.password, this.props.name)
        else
            this.props.loginUser(this.props.email, this.props.password)
    }
	render() {
        const { email, password, name, showRegister, registering, registerError, } = this.props
		return (
            <div className={'login-container'}>
                <div className={'login-box container'}>
                    <Panel bsStyle="primary" header={<h2>Coral Commons Sign In</h2>}>
                    <form onSubmit={this.handleSubmit}>
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
                        {!showRegister ? null : 
                            <Input type="text"
                                label={'Name'}
                                placeholder={'John Smith'}
                                value={name}
                                onChange={(e) => this.props.updateName(e.target.value)} />
                        }
                        <div className={'pull-right'}>
                            <button type="submit" className={'btn btn-primary'}>{showRegister ? 'Create User' : 'Login'}</button>
                            <button type="button" onClick={this.props.toggleRegister} className={'btn btn-default'}>{showRegister ? 'Cancel' :'Register'}</button>
                        </div>
                    </form>
                    </Panel>
                </div>
            </div>
		)
	}
}