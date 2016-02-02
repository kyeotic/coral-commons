import Immutable from 'immutable'
import { 
	UPDATE_FORM_EMAIL, UPDATE_FORM_PASSWORD, UPDATE_FORM_NAME, UPDATE_USER_ID, UPDATE_USER_ROLE,
	TOGGLE_REGISTER, REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
	LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOG_OUT_USER,
	RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR
} from'auth/actions'
import users from 'users/actions'
import Firebase from 'util/firebase'

let defaultState = { 
	userId: null,
	userRole: null,
	isLoggedIn: Firebase.getAuth() !== null,
	isLoggingIn: false,
	showRegister: false,
	isRegistering: false,
	authError: null,
	isResettingPassword: false,
	passwordReset: false,

	uid: null,
	email: null,
}

export default function auth(state = Immutable.Map(defaultState), action) {
	switch (action.type) {
	//User Id
	case UPDATE_USER_ID:
		return state.set('userId', action.payload)
	case users.ADDED:
	case users.UPDATED:
		return action.payload.id === state.get('userId') ?
			state.set('userRole', action.payload.value.role) :
			state
	case UPDATE_USER_ROLE:
		return state.set('userRole', action.payload)

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
		return state.withMutations(s => {
			s.set('isRegistering', true)
			 .set('authError', null)
		})
	case REGISTER_USER_SUCCESS:
		return state.withMutations(s => {
			s.set('isRegistering', false)
			 .set('showRegister', false)
			 .set('isLoggedIn', true)
		})
	case REGISTER_USER_ERROR:
		return state.withMutations(s => {
			s.set('isRegistering', false)
			 .set('authError', action.payload)
		})

	//Login
	case LOGIN_USER_START:
		return state.withMutations(s => {
			s.set('isLoggingIn', true)
			 .set('authError', null)
			 .set('passwordReset', false)
		})
	case LOGIN_USER_SUCCESS:
		return state.withMutations(s => {
			s.set('isLoggingIn', false)
			 .set('isLoggedIn', true)
		})
	case LOGIN_USER_ERROR:
		return state.withMutations(s => {
			s.set('isLoggingIn', false)
			 .set('authError', action.payload)
		})

	case LOG_OUT_USER:
		return state.withMutations(s => {
			s.set('isLoggedIn', false)
			 //.set('email', null)
			 .set('password', null)
			 .set('name', null)
		})

	//Reset Password
	case RESET_PASSWORD_START:
		return state.withMutations(s => {
			s.set('authError', null)
			 .set('isResettingPassword', true)
			 .set('passwordReset', false)
		})
	case RESET_PASSWORD_SUCCESS:
		return state.withMutations(s => {
			s.set('isResettingPassword', false)
			 .set('passwordReset', true)
		})
	case RESET_PASSWORD_ERROR:
		return state.withMutations(s => {
			s.set('authError', action.payload)
			 .set('isResettingPassword', false)
		})


	default:
		return state
	}
}