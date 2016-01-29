import Immutable from 'immutable';

export default function auth(state = Immutable.Map({ isLoggedIn: false}), action) {
	switch (action.type) {
	case 'UPDATE':
	    return state.set()
	default:
		return state;
	}
}