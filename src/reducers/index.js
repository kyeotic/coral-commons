import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from 'reducers/auth';
import navigation from 'reducers/navigation'

const rootReducer = combineReducers({
	routing: routeReducer,
	auth,
	navigation
});

export default rootReducer;