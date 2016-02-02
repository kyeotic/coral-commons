import action from 'util/actionCreator'
import Firebase from 'util/firebase'
import http from 'util/http'
import toast from 'util/toast'

//Auth Id
//
export const UPDATE_USER_ID = 'UPDATE_USER_ID'
export const updateUserId = action(UPDATE_USER_ID)

export const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE'
export const updateUserRole = action(UPDATE_USER_ROLE)

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
			.then(auth => {
				dispatch(loginUserSuccess({email, auth}))
			}).catch(error => {
				dispatch(loginUserError(error.code))
			})
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
			.then(() => {
					dispatch(resetPasswordSuccess(email))
					toast.success('Password reset email sent')
			}).catch(error => {
					dispatch(resetPasswordError(error.code))
			})
	}
}


//Change Email
export const CHANGE_EMAIL_START = 'CHANGE_EMAIL_START'
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS'
export const CHANGE_EMAIL_ERROR = 'CHANGE_EMAIL_ERROR'

let changeEmailStart = action(CHANGE_EMAIL_START)
let changeEmailSuccess = action(CHANGE_EMAIL_SUCCESS)
let changeEmailError = action(CHANGE_EMAIL_ERROR)

export function changeEmail(credentials) {
	return (dispatch, getState) => {
		dispatch(changeEmailStart(credentials))
		return Firebase.changeEmail(credentials)
			.then(() => {
				return logout()
			})
			.then(() => {
				return loginUser(credentials.newEmail, credentials.password)(dispatch)
			})
			.then(() => {
					dispatch(changeEmailSuccess(credentials))
					toast.success('Email successfully changed')
			}).catch(error => {
					dispatch(changeEmailError(error.code))
					toast.error('An error occured changing your email: ' + error.code)
			})
	}
}

//Change Passwrd
export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR'

let changePasswordStart = action(CHANGE_PASSWORD_START)
let changePasswordSuccess = action(CHANGE_PASSWORD_SUCCESS)
let changePasswordError = action(CHANGE_PASSWORD_ERROR)

export function changePassword(credentials) {
	return (dispatch, getState) => {
		dispatch(changePasswordStart(credentials))
		return Firebase.changePassword(credentials)
			.then(() => {
				return logout()
			})
			.then(() => {
				return loginUser(credentials.email, credentials.newPassword)(dispatch)
			})
			.then(() => {
					dispatch(changePasswordSuccess(credentials))
					toast.success('Password successfully changed')
			}).catch(error => {
					dispatch(changePasswordError(error.code))
					toast.error('An error occured changing your password: ' + error.code)
			})
	}
}

//Temporary Password
export const UPDATE_PASSWORD_IS_TEMPORARY = 'UPDATE_PASSWORD_IS_TEMPORARY'
export let updatePasswordIsTemporary = action(UPDATE_PASSWORD_IS_TEMPORARY)