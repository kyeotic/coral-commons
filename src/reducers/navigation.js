import Immutable from 'immutable'
import { UPDATE_LOCATION } from 'react-router-redux'
import { NAV_TOGGLE_COLLAPSE } from 'actions/navigation'

let defaultState = {
	isCollapseExpanded: true
}

export default function navigation(state = Immutable.Map(defaultState), action) {
	switch(action.type) {
		case NAV_TOGGLE_COLLAPSE:
			return state.set('isCollapseExpanded', !state.get('isCollapseExpanded'))
		case UPDATE_LOCATION:
			return state.set('isCollapseExpanded', false)
		default:
			return state
	}
}