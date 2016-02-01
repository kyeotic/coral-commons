import Firebase from 'firebase'
import { updateEmail, updateUserId } from 'auth/actions'
import {startListeningToUsers, stopListeningToUsers} from 'users/actions'
import {startListeningToResidents, stopListeningToResidents} from 'residents/actions'
import {startListeningToHouses, stopListeningToHouses} from 'houses/actions'

export const CHILD_ADDED = 'child_added'
export const CHILD_REMOVED = 'child_removed'
export const CHILD_CHANGED = 'child_changed'

const rootFirebase = new Firebase("https://coral-commons-dev.firebaseio.com")

export default rootFirebase

export function subscribeToFirebase(dispatch) {
	rootFirebase.onAuth(auth => {
		if (!auth) {
			dispatch(updateUserId(null))

			stopListeningToResidents()
			stopListeningToUsers()
			stopListeningToHouses()
			return
		}
		dispatch(updateUserId(auth.uid))
		dispatch(updateEmail(auth.password.email))

		startListeningToUsers(dispatch)
		startListeningToResidents(dispatch)
		startListeningToHouses(dispatch)
	})
}