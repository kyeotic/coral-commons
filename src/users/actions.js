import action from 'util/actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'util/firebase'


export const USER_ADDED = 'USER_ADDED'
export const USER_REMOVED = 'USER_REMOVED'
export const USER_UPDATED = 'USER_UPDATED'

const userAdded = action(USER_ADDED)
const userRemoved = action(USER_REMOVED)
const userUpdated = action(USER_REMOVED)


export function startListeningToUsers(dispatch) {
	const users = Firebase.child('users')
	users.on(CHILD_ADDED, snapshot => 
		dispatch(userAdded({id: snapshot.key(), value: snapshot.val()})))
	users.on(CHILD_REMOVED, snapshot => 
		dispatch(userRemoved({id: snapshot.key()})))
	users.on(CHILD_CHANGED, snapshot => 
		dispatch(userUpdated({id: snapshot.key(), value: snapshot.val()})))
}

export function stopListeningToUsers() {
	const users = Firebase.child('users')
	users.off(CHILD_ADDED, userAdded)
	users.off(CHILD_REMOVED, userRemoved)
	users.off(CHILD_CHANGED, userUpdated)
}