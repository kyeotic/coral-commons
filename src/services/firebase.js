import Firebase from 'firebase'
import { updateEmail, updateUserId } from 'actions/auth'

export const CHILD_ADDED = 'child_added'
export const CHILD_REMOVED = 'child_removed'
export const CHILD_CHANGED = 'child_changed'

const rootFirebase = new Firebase("https://coral-commons-dev.firebaseio.com")

//rootFirebase.unauth()

export default rootFirebase

export function subscribeToFirebase(dispatch) {
	rootFirebase.onAuth(auth => {
		if (!auth) {
			dispatch(updateUserId(null))
			
			stopListeningToResidents()
			stopListeningToUsers()
			return
		}
		dispatch(updateUserId(auth.uid))
		dispatch(updateEmail(auth.password.email))

		startListeningToUsers(dispatch)
		startListeningToResidents(dispatch)
	})
}



/*rootFirebase.child('users').on('value', function(users) {
	console.log('user loaded', users.val())
}, error => console.error('user error', error))*/