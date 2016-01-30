import Immutable from 'immutable'
import { 
	UPDATE_FORM_EMAIL, UPDATE_FORM_PASSWORD, UPDATE_FORM_NAME,
	TOGGLE_REGISTER, REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
	LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR
} from'actions/auth'
import Firebase from 'services/firebase'

let defaultState = { 
	isLoggedIn: Firebase.getAuth() !== null,
	isLoggingIn: false,
	showRegister: false,
	isRegistering: false,
	registerError: null,
	loginError: null,

	uid: null,
	email: null,
}

export default function auth(state = Immutable.Map(defaultState), action) {
	switch (action.type) {
	//Form
	case UPDATE_FORM_EMAIL:
	    return state.set('email', action.payload)
   	case UPDATE_FORM_PASSWORD:
	    return state.set('password', action.payload)
	case UPDATE_FORM_NAME:
	    return state.set('name', action.payload)
	
	//Register
	case TOGGLE_REGISTER:
		return state.set('showRegister', !state.get('showRegister'))
	case REGISTER_USER_START:
		return state.set('isRegistering', true);
	case REGISTER_USER_SUCCESS:
		return state.withMutations(s => {
			s.set('isRegistering', false)
			 .set('showRegister', false)
			 .set('isLoggedIn', true)
			 .set('registerError', null)
		})
	case REGISTER_USER_ERROR:
		return state.withMutations(s => {
			s.set('isRegistering', false)
			 .set('registerError', action.payload.error)
		})

	//Login
	case LOGIN_USER_START:
		return state.set('isLoggingIn', true)
	case LOGIN_USER_SUCCESS:
		return state.withMutations(s => {
			s.set('isLoggingIn', false)
			 .set('isLoggedIn', true)
		})
	case LOGIN_USER_ERROR:
		return state.withMutations(s => {
			s.set('isLoggingIn', false)
			 .set('loginError', action.payload.error)
		})

	default:
		return state
	}
}