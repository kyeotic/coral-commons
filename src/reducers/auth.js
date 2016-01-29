import Immutable from 'immutable';
import { UPDATE_FORM_EMAIL, UPDATE_FORM_PASSWORD } from'actions/auth';

export default function auth(state = Immutable.Map({ isLoggedIn: false}), action) {
	switch (action.type) {
	case 'UPDATE_FORM_EMAIL':
	    return state.set('email', action.payload)
   case 'UPDATE_FORM_PASSWORD':
	    return state.set('password', action.payload)
	default:
		return state;
	}
}