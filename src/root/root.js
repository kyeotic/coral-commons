import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './app'
import Users from 'pages/users'
import Residents from 'pages/residents'
import UserProfile from 'pages/userProfile'
import Houses from 'pages/houses'

const routes = (
	<Router history={browserHistory}>
      <Route path="/" component={App}>
      	<IndexRoute component={Residents} />
      	<Route path="users" component={Users} />
      	<Route path="houses" component={Houses} />
      	<Route path="profile" component={UserProfile} />
      </Route>
    </Router>
)

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.shape({
			dispatch: PropTypes.func.isRequired
		}).isRequired
	}
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				{ routes}
			</Provider>
		)
	}
}