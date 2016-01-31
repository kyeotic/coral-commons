import action from 'util/actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'util/firebase'


export const HOUSE_ADDED = 'HOUSE_ADDED'
export const HOUSE_REMOVED = 'HOUSE_REMOVED'
export const HOUSE_UPDATED = 'HOUSE_UPDATED'

const houseAdded = action(HOUSE_ADDED)
const houseRemoved = action(HOUSE_REMOVED)
const houseUpdated = action(HOUSE_REMOVED)

export function startListeningToHouses(dispatch) {
	const houses = Firebase.child('houses')
	houses.on(CHILD_ADDED, snapshot => 
		dispatch(houseAdded({id: snapshot.key(), value: snapshot.val()})))
	houses.on(CHILD_REMOVED, snapshot => 
		dispatch(houseRemoved({id: snapshot.key()})))
	houses.on(CHILD_CHANGED, snapshot => 
		dispatch(houseUpdated({id: snapshot.key(), value: snapshot.val()})))
}

export function stopListeningToHouses() {
	const houses = Firebase.child('houses')
	houses.off(HOUSE_ADDED, houseAdded)
	houses.off(HOUSE_REMOVED, houseRemoved)
	houses.off(HOUSE_UPDATED, houseUpdated)
}

export const CREATE_HOUSE_START = 'CREATE_HOUSE_START'
export const CREATE_HOUSE_SUCCESS = 'CREATE_HOUSE_SUCCESS'
export const CREATE_HOUSE_ERROR = 'CREATE_HOUSE_ERROR'
