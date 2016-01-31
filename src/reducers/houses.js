import Immutable from 'immutable'
import { 
	HOUSE_ADDED, HOUSE_REMOVED, HOUSE_UPDATED
} from'actions/houses'
import Firebase from 'services/firebase'

export default function houses(state = Immutable.Map({}), action) {
	switch (action.type) {

	case HOUSE_ADDED:
	case HOUSE_UPDATED:
		return state.set(action.payload.id, action.payload.value)
	case HOUSE_REMOVED:
		return state.delete(action.payload.id)

	default:
		return state
	}
}