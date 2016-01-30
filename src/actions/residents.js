import action from './actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'services/firebase'


export const RESIDENT_ADDED = 'RESIDENT_ADDED'
export const RESIDENT_REMOVED = 'RESIDENT_REMOVED'
export const RESIDENT_UPDATED = 'RESIDENT_UPDATED'

const residentAdded = action(RESIDENT_ADDED)
const residentRemoved = action(RESIDENT_REMOVED)
const residentUpdated = action(RESIDENT_REMOVED)
const residents = Firebase.child('residents')

export function startListeningToResidents(dispatch) {	
	residents.on(CHILD_ADDED, snapshot => 
		dispatch(residentAdded({id snapshot.key(), value: snapshot.val()}))
	residents.on(CHILD_REMOVED, snapshot => 
		dispatch(residentRemoved({id: snapshot.key()}))
	residents.on(CHILD_CHANGED, snapshot => 
		dispatch(residentUpdated({id snapshot.key(), value: snapshot.val()}))
}

export function stopListeningToResidents() {
	residents.off(residentAdded)
	residents.off(residentRemoved)
	residents.off(residentUpdated)
}