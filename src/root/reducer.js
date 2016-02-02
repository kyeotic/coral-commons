import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from 'auth/reducer';
import navigation from 'navigation/reducer'
import users from 'users/reducer'
import residents from 'residents/reducer'
import houses from 'houses/reducer'
import bulletins from 'bulletins/reducer'

const rootReducer = combineReducers({
	routing: routeReducer,
	auth,
	navigation,
	users,
	residents,
	houses,
	bulletins
})

export default rootReducer;