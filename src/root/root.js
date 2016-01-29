import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Users from 'pages/users';
import Residents from 'pages/residents';

const routes = (
	<Router history={browserHistory}>
      <Route path="/" component={App}>
      	<IndexRoute component={Users} />
      	<Route path="residents" component={Residents} />
      </Route>
    </Router>
);

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.shape({
			dispatch: PropTypes.func.isRequired
		}).isRequired
	}
	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
				{ routes}
			</Provider>
		);
	}
}