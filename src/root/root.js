import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from 'root/app'
import Bulletins from 'pages/bulletins'
import Bulletin from 'pages/bulletin'
import Users from 'pages/users'
import Residents from 'pages/residents'
import Resident from 'pages/resident'
import UserProfile from 'pages/userProfile'
import Houses from 'pages/houses'
import House from 'pages/house'

const routes = (
	<Router history={browserHistory}>
      <Route path="/" component={App}>
      
      	<IndexRoute component={Bulletins} />
      	<Route path="bulletins/:id" component={Bulletin} />

      	<Route path="residents" component={Residents} />
      	<Route path="residents/:id" component={Resident} />

      	<Route path="houses" component={Houses} />
      	<Route path="houses/:id" component={House} />

      	<Route path="users" component={Users} />
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
				{ routes }
			</Provider>
		)
	}
}