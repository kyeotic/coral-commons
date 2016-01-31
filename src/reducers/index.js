import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from 'auth/reducer';
import navigation from 'navigation/reducer'
import users from 'reducers/users'
import residents from 'reducers/residents'
import houses from 'reducers/houses'

const rootReducer = combineReducers({
	routing: routeReducer,
	auth,
	navigation,
	users,
	residents,
	houses
})

export default rootReducer;