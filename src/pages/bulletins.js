import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Panel, Button, Row, Col, Table, Glyphicon, Grid, ButtonToolbar  } from 'react-bootstrap'
import ToggleButtonInput from 'components/toggleButtonInput'
import { Link } from 'react-router'
import mapToKeyedList from 'util/mapToKeyedList'
import bulletins from 'bulletins/actions'
import dynamicSort from 'util/dynamicSort'

import Markdown from 'react-markdown'

@connect(state => ({
	bulletins: mapToKeyedList(state.bulletins.get('items').toJS()),
	users: state.users.get('items').toJS(),
	userId: state.auth.get('userId'),
	isManager: state.auth.get('isManager')
}), { remove: bulletins.remove  })
export default class Bulletins extends Component {
	render() {
		let { bulletins, users, userId, isManager, remove } = this.props

		bulletins.forEach(bulletin => {
			if (bulletin.userId) {
				let user = users[bulletin.userId]
				bulletin.author = user ? user.name : null
			}
		})

		bulletins.sort(dynamicSort("-id"))

		return (
			<div>
				<div className={"page-header"}>
					<h1>Bulletins
						<div className="pull-right">
							<Link className={'btn btn-primary'} to="/bulletins/new"><Glyphicon glyph={'plus'} /> Add New</Link>
						</div>
					</h1>
				</div>

				{ bulletins.map(bulletin => {
					let title = (
						<h2>{bulletin.title} {bulletin.author ? <small>{'by ' + bulletin.author}</small> : null}
							{isManager || bulletin.userId === userId ? 
								<div className="pull-right">
									<ButtonToolbar >
										<Link className={'btn btn-default btn-xs'} to={'/bulletins/' + bulletin.id}>
											<Glyphicon glyph="edit" />
										</Link>
										<Button bsStyle="danger" bsSize="xsmall"
											onClick={() => remove(bulletin.id)}>
											<Glyphicon glyph="remove" />
										</Button>
								</ButtonToolbar>
								</div>
								: null}
						</h2>)
					return (
						<Panel header={title}>
							<Markdown source={bulletin.content} />
						</Panel>
					)
				})}
			</div>
		)
	}
}