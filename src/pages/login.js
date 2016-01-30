import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, ButtonInput } from 'react-bootstrap'
import { 
    updateEmail, updatePassword, updateName,
    toggleRegister, registerUser, loginUser, resetPassword
} from 'actions/auth'

@connect(state => {
    return state.auth.toJS()
}, { updateEmail, updatePassword, updateName, toggleRegister, registerUser, loginUser, resetPassword } )
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
        const { email, password, name, showRegister, registering, authError, passwordReset } = this.props
		return (
            <div className={'login-container'}>
                <div className={'login-box container'}>
                    <Panel bsStyle="primary" header={<h2>Coral Commons Sign In</h2>}>
                    <form onSubmit={this.handleSubmit}>
                        <Input type="text"
                            placeholder={'name@domain.com'}
                            label={'Email Address' + (authError === 'INVALID_USER' ? ' - Not Found' 
                                                    : authError === 'EMAIL_TAKEN' ? ' - Email Taken'
                                                    : authError === 'EMAIL_REQUIRED' ? ' - Required'
                                                    : passwordReset ? ' - Password Reset' : '')}
                            value={email}
                            bsStyle={['INVALID_USER', 'EMAIL_TAKEN', 'EMAIL_REQUIRED'].indexOf(authError) !== -1  
                            ? 'error' 
                            : passwordReset ? 'success' : ''} hasFeedback
                            onChange={(e) => this.props.updateEmail(e.target.value)} />
                        <Input type="password"
                            placeholder={'password'}
                            label={'Password' + (authError === 'INVALID_PASSWORD' ? ' - Invalid' 
                                                : authError === 'PASSWORD_REQUIRED' ? ' - Required' : '')}
                            value={password}
                            bsStyle={['INVALID_PASSWORD', 'PASSWORD_REQUIRED'].indexOf(authError) !== -1 ? 'error' :''} hasFeedback
                            onChange={(e) => this.props.updatePassword(e.target.value)} />
                        {showRegister ? 
                            <Input type="text"
                                label={'Name' + (authError === 'NAME_REQUIRED' ? ' - Required' : '')}
                                placeholder={'John Smith'}
                                value={name}
                                bsStyle={authError === 'NAME_REQUIRED' ? 'error' :''} hasFeedback
                                onChange={(e) => this.props.updateName(e.target.value)} />
                            : <button type="button" onClick={() => this.props.resetPassword(email)} className={'btn btn-sm btn-link'}>Reset Password</button>
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