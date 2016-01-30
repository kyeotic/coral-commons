import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from 'reducers/auth';
import navigation from 'reducers/navigation'
import users from 'reducers/users'
import residents from 'reducers/residents'

const rootReducer = combineReducers({
	routing: routeReducer,
	auth,
	navigation,
	users,
	residents
})

export default rootReducer;