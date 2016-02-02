import Firebase from 'firebase'
import { updateEmail, updateUserId, updateUserRole, updatePasswordIsTemporary } from 'auth/actions'

const rootFirebase = new Firebase(window._firebaseRef)

export default rootFirebase

export function subscribeToFirebase(dispatch, handlers = []) {
	rootFirebase.onAuth(auth => {
		let cancelled = false
		if (!auth) {
			dispatch(updateUserId(null))
			handlers.forEach(handler => handler.stopListening())
			return
		}
		dispatch(updateUserId(auth.uid))
		dispatch(updateEmail(auth.password.email))
		handlers.forEach(handler => handler.startListening(dispatch))

		if (auth.password.isTemporaryPassword) {
			dispatch(updatePasswordIsTemporary(true))
		} else {
			dispatch(updatePasswordIsTemporary(false))
		}

		rootFirebase.child('users').child(auth.uid).child('role').on('value', snapshot => {
			let role = snapshot.val()
			dispatch(updateUserRole(role))
			if (cancelled && role !== 'Unverified') {
				handlers.forEach(handler => handler.startListening(dispatch))
			}
			cancelled = role === 'Unverified'
		})
	})
}