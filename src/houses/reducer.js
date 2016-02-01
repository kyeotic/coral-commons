import Immutable from 'immutable'
import * as actions from 'houses/actions'
import Firebase from 'util/firebase'

let defaultState = {
	items: Immutable.Map(),

	isCreatingHouse: false,
	createHouseError: null,

	isRemovingHouse: false,
	removeHouseError: null,

	isUpdatingHouse: false,
	updateHouseError: null
}

export default function houses(state = Immutable.Map(defaultState), action) {
	switch (action.type) {

	case actions.HOUSE_ADDED:
	case actions.HOUSE_UPDATED:
		return state.setIn(['items', action.payload.id], action.payload.value)
	case actions.HOUSE_REMOVED:
		return state.deleteIn(['items', action.payload.id])

	case actions.CREATE_HOUSE_START:
		return state.withMutations(s => {
			s.set('isCreatingHouse', true)
			 .set('createHouseError', null)
		})
	case actions.CREATE_HOUSE_SUCCESS:
		return state.withMutations(s => {
			s.set('isCreatingHouse', false)
		})
	case actions.CREATE_HOUSE_ERROR:
		return state.withMutations(s => {
			s.set('isCreatingHouse', false)
			 .set('createHouseError', action.payload)
		})

	case actions.REMOVE_HOUSE_START:
		return state.withMutations(s => {
			s.set('isRemovingHouse', true)
			 .set('removeHouseError', null)
		})
	case actions.REMOVE_HOUSE_SUCCESS:
		return state.withMutations(s => {
			s.set('isRemovingHouse', false)
		})
	case actions.REMOVE_HOUSE_ERROR:
		return state.withMutations(s => {
			s.set('isRemovingHouse', false)
			 .set('removeHouseError', action.payload)
		})

	case actions.UPDATE_HOUSE_START:
		return state.withMutations(s => {
			s.set('isUpdatingHouse', true)
			 .set('updateHouseError', null)
		})
	case actions.UPDATE_HOUSE_SUCCESS:
		return state.withMutations(s => {
			s.set('isUpdatingHouse', false)
		})
	case actions.UPDATE_HOUSE_ERROR:
		return state.withMutations(s => {
			s.set('isUpdatingHouse', false)
			 .set('updateHouseError', action.payload)
		})

	default:
		return state
	}
}