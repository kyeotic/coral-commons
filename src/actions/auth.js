import action from './actionCreator'
import Firebase from 'services/firebase'
import http from 'services/http'

//Login Form
//
export const UPDATE_FORM_EMAIL  = 'UPDATE_FORM_EMAIL'
export const UPDATE_FORM_PASSWORD = 'UPDATE_FORM_PASSWORD'
export const UPDATE_FORM_NAME = 'UPDATE_FORM_NAME'

export const updateEmail = action(UPDATE_FORM_EMAIL)
export const updatePassword = action(UPDATE_FORM_PASSWORD)
export const updateName = action(UPDATE_FORM_NAME)

//Register User
//
export const TOGGLE_REGISTER = 'TOGGLE_REGISTER'
export const toggleRegister = action(TOGGLE_REGISTER)

export const REGISTER_USER_START = 'REGISTER_USER_START'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'

let registerUserStart = action(REGISTER_USER_START);
let registerUserSuccess = action(REGISTER_USER_SUCCESS);
let registerUserError = action(REGISTER_USER_ERROR);

export function registerUser(email, password, name) {
	let credentials = {email, password};
	return (dispatch, getState) => {
		dispatch(registerUserStart(email))
		return Firebase.createUser(credentials)
			.then(user => 
				http.post('/users', {uid: user.uid, name: name}))
			.then(response => 
				Firebase.authWithPassword(credentials))
			.then(response => 
				dispatch(registerUserSuccess(email)))
			.catch(error => {
				console.error(error)
				dispatch(registerUserError({email, error}))
			})
	}
}

//Login
//
export const LOGIN_USER_START = 'LOGIN_USER_START'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

let loginUserStart = action(LOGIN_USER_START)
let loginUserSuccess = action(LOGIN_USER_SUCCESS)
let loginUserError = action(LOGIN_USER_ERROR)

export function loginUser(email, password) {
	return dispatch => {
		dispatch(loginUserStart(email))
		return Firebase.authWithPassword({email, password})
			.then(auth => dispatch(loginUserSuccess({email, auth})))
			.catch(error => dispatch(loginUserError(error)))
	}
}