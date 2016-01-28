import { combineReducers } from 'redux';
import { UPDATE } from 'actions/index';


function reducer(state = { }, action) {
	switch (action.type) {
	case UPDATE:
	    return Object.assign({}, action.thing);
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	state: reducer
});

export default rootReducer;