import Firebase from 'firebase'
import { updateEmail, updateUserId } from 'auth/actions'

const rootFirebase = new Firebase("https://coral-commons-dev.firebaseio.com")

export default rootFirebase

export function subscribeToFirebase(dispatch, handlers = []) {
	rootFirebase.onAuth(auth => {
		if (!auth) {
			dispatch(updateUserId(null))
			handlers.forEach(handler => handler.stopListening())
			return
		}
		dispatch(updateUserId(auth.uid))
		dispatch(updateEmail(auth.password.email))
		handlers.forEach(handler => handler.startListening(dispatch))
	})
}