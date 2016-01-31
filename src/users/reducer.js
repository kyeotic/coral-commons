import Immutable from 'immutable'
import { 
	USER_ADDED, USER_REMOVED, USER_UPDATED
} from'users/actions'
import Firebase from 'util/firebase'

export default function users(state = Immutable.Map({}), action) {
	switch (action.type) {

	case USER_ADDED:
	case USER_UPDATED:
		return state.set(action.payload.id, action.payload.value)
	case USER_REMOVED:
		return state.delete(action.payload.id)

	default:
		return state
	}
}