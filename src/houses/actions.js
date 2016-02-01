import action, {autoAction} from 'util/actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'util/firebase'
import toast from 'util/toast'

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

export function createHouse(house) {
	const houses = Firebase.child('houses')
	let newHouse = houses.push()	
	return dispatch => {
		let toSave ={id: newHouse.key(), value: house}
		dispatch(autoAction(CREATE_HOUSE_START, toSave))
		return newHouse.set(house)
			.then(() => {
				toast.success('House created successfully')
				dispatch(autoAction(CREATE_HOUSE_SUCCESS, toSave))
			}).catch(error => {
				toast.error('An error occured creating the house: ' + error.code)
				dispatch(autoAction(CREATE_HOUSE_ERROR, Object.assign(toSave, {error})))
			})
	}
}

export const REMOVE_HOUSE_START = 'REMOVE_HOUSE_START'
export const REMOVE_HOUSE_SUCCESS = 'REMOVE_HOUSE_SUCCESS'
export const REMOVE_HOUSE_ERROR = 'REMOVE_HOUSE_ERROR'

export function removeHouse(id) {
	const house = Firebase.child('houses').child(id)
	return dispatch => {
		dispatch(autoAction(REMOVE_HOUSE_START, id))
		house.remove()
			.then(() => {
				toast.success('House removed successfully')
				dispatch(autoAction(REMOVE_HOUSE_SUCCESS, id))
			}).catch(error => {
				toast.error('An error occured removing the house: ' + error.code)
				dispatch(autoAction(REMOVE_HOUSE_ERROR, Object.assign(toSave, {error})))
			})
	}
}

export const UPDATE_HOUSE_START = 'UPDATE_HOUSE_START'
export const UPDATE_HOUSE_SUCCESS = 'UPDATE_HOUSE_SUCCESS'
export const UPDATE_HOUSE_ERROR = 'UPDATE_HOUSE_ERROR'

export function updateHouse(house) {
	return dispatch => {		
		dispatch(autoAction(UPDATE_HOUSE_START, house))
		let toSave = Object.assign({}, house)
		delete toSave.id
		Firebase.child('houses').child(house.id).set(toSave)
			.then(() => {
				toast.success('House updated successfully')
				dispatch(autoAction(UPDATE_HOUSE_SUCCESS, house))
			}).catch(error => {
				toast.error('An error occured updating the house: ' + error.code)
				dispatch(autoAction(UPDATE_HOUSE_ERROR, Object.assign(house, {error})))
			})
	}
}