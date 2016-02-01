import Immutable from 'immutable'
import { 
	HOUSE_ADDED, HOUSE_REMOVED, HOUSE_UPDATED,
	TOGGLE_CREATE_HOUSE,
	CREATE_HOUSE_START, CREATE_HOUSE_SUCCESS, CREATE_HOUSE_ERROR
} from 'houses/actions'
import Firebase from 'util/firebase'

let defaultState = {
	isCreatingHouse: false,
	createHouseError: null,
	items: Immutable.Map()
}

export default function houses(state = Immutable.Map(defaultState), action) {
	switch (action.type) {

	case HOUSE_ADDED:
	case HOUSE_UPDATED:
		return state.setIn(['items', action.payload.id], action.payload.value)
	case HOUSE_REMOVED:
		return state.deleteIn(['items', action.payload.id])

	case CREATE_HOUSE_START:
		return state.withMutations(s => {
			s.set('isCreatingHouse', true)
			 .set('createHouseError', null)
		})
	case CREATE_HOUSE_SUCCESS:
		return state.withMutations(s => {
			s.set('isCreatingHouse', false)
		})
	case CREATE_HOUSE_ERROR:
		console.log(action.payload)
		return state.withMutations(s => {
			s.set('isCreatingHouse', false)
			 .set('createHouseError', action.payload)
		})

	default:
		return state
	}
}