import React, { Component, PropTypes } from 'react'
import {Panel} from 'react-bootstrap'
let welcome = `
Your account has been created, but you still need to be verified by a site administrator or board member. We take data security very seriously, and this site contains personal contact information. Until you are verified this is as far as we can let you go =)
`

export default class Unverified extends Component {
	render() {
		return (
			<div className={'login-container'}>
                <div className={'login-box container'}>
                    <Panel bsStyle="primary" header={<h2>Coral Commons</h2>}>
                    	<p>{welcome}</p>
                    </Panel>
                </div>
            </div>
		)
	}
}