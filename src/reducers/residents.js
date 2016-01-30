import Immutable from 'immutable'
import { 
	RESIDENT_ADDED, RESIDENT_REMOVED, RESIDENT_UPDATED
} from'actions/residents'
import Firebase from 'services/firebase'

export default function residents(state = Immutable.Map({}), action) {
	switch (action.type) {

	case RESIDENT_ADDED:
	case RESIDENT_UPDATED:
		return state.set(action.payload.id, action.payload.value)
	case RESIDENT_REMOVED:
		return state.delete(action.payload.id)

	default:
		return state
	}
}