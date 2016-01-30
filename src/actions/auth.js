import action from './actionCreator'
import Firebase from 'services/firebase'
import http from 'services/http'

//Auth Id
//
export const UPDATE_USER_ID = 'UPDATE_USER_ID'
export const updateUserId = action(UPDATE_USER_ID)

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
	if (!email) return registerUserError('EMAIL_REQUIRED')
	if (!password) return registerUserError('PASSWORD_REQUIRED')
	if (!name) return registerUserError('NAME_REQUIRED')

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
				dispatch(registerUserError(error.code))
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
	if (!email) return loginUserError('EMAIL_REQUIRED')
	if (!password) return loginUserError('PASSWORD_REQUIRED')
	return dispatch => {
		dispatch(loginUserStart(email))
		return Firebase.authWithPassword({email, password})
			.then(auth => 
				dispatch(loginUserSuccess({email, auth})))
			.catch(error => 
				dispatch(loginUserError(error.code)))
	}
}

//Logout
//
export const LOG_OUT_USER = 'LOG_OUT_USER'
let logoutUser = action(LOG_OUT_USER)

export function logout() {
	Firebase.unauth()
	return logoutUser()
}

//Reset Password
//
export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

let resetPasswordStart = action(RESET_PASSWORD_START)
let resetPasswordSuccess = action(RESET_PASSWORD_SUCCESS)
let resetPasswordError = action(RESET_PASSWORD_ERROR)

export function resetPassword(email) {
	if (!email) return resetPasswordError('EMAIL_REQUIRED')

	return (dispatch, getState) => {
		dispatch(resetPasswordStart(email))
		Firebase.resetPassword({email})
			.then(() => 
					dispatch(resetPasswordSuccess(email)))
			.catch(error =>
					dispatch(resetPasswordError(error.code)))
	}
}
