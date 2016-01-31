import action from './actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'services/firebase'


export const RESIDENT_ADDED = 'RESIDENT_ADDED'
export const RESIDENT_REMOVED = 'RESIDENT_REMOVED'
export const RESIDENT_UPDATED = 'RESIDENT_UPDATED'

const residentAdded = action(RESIDENT_ADDED)
const residentRemoved = action(RESIDENT_REMOVED)
const residentUpdated = action(RESIDENT_REMOVED)


export function startListeningToResidents(dispatch) {
	const residents = Firebase.child('residents')	
	residents.on(CHILD_ADDED, snapshot => 
		dispatch(residentAdded({id: snapshot.key(), value: snapshot.val()})))
	residents.on(CHILD_REMOVED, snapshot => 
		dispatch(residentRemoved({id: snapshot.key()})))
	residents.on(CHILD_CHANGED, snapshot => 
		dispatch(residentUpdated({id: snapshot.key(), value: snapshot.val()})))
}

export function stopListeningToResidents() {
	const residents = Firebase.child('residents')
	residents.off(CHILD_ADDED, residentAdded)
	residents.off(CHILD_REMOVED, residentRemoved)
	residents.off(CHILD_CHANGED, residentUpdated)
}