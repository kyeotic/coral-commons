import action, {autoAction} from 'util/actionCreator'
import Firebase from 'util/firebase'
import toast from 'util/toast'
import Immutable from 'immutable'

const CHILD_ADDED = 'child_added'
const CHILD_REMOVED = 'child_removed'
const CHILD_CHANGED = 'child_changed'

export default class FirebaseListHandler {
	constructor(firebaseRef, config = {}) {
		this.ref = firebaseRef

		//Firebase subscriptions
		this.ADDED = Symbol('ADDED')
		this.REMOVED = Symbol('REMOVED')
		this.UPDATED = Symbol('UPDATED')
		this.childAdded = action(this.ADDED)
		this.childRemoved = action(this.REMOVED)
		this.childUpdated = action(this.UPDATED)

		//Actions
		//
		this.CREATE_START = Symbol('CREATE_START')
		this.CREATE_SUCCESS = Symbol('CREATE_SUCCESS')
		this.CREATE_ERROR = Symbol('CREATE_ERROR')

		this.REMOVE_START = Symbol('REMOVE_START')
		this.REMOVE_SUCCESS = Symbol('REMOVE_SUCCESS')
		this.REMOVE_ERROR = Symbol('REMOVE_ERROR')

		this.UPDATE_START = Symbol('UPDATE_START')
		this.UPDATE_SUCCESS = Symbol('UPDATE_SUCCESS')
		this.UPDATE_ERROR = Symbol('UPDATE_ERROR')

		//Messages
		//
		this.singularName = config.name
		this.pluralName = config.pluralName || this.singularName + 's'
	}

	startListening = (dispatch) => {
		this.ref.on(CHILD_ADDED, snapshot => 
			dispatch(this.childAdded({id: snapshot.key(), value: snapshot.val()})))
		this.ref.on(CHILD_REMOVED, snapshot => 
			dispatch(this.childRemoved({id: snapshot.key()})))
		this.ref.on(CHILD_CHANGED, snapshot => 
			dispatch(this.childUpdated({id: snapshot.key(), value: snapshot.val()})))
	}

	stopListening = () => {
		this.ref.off(CHILD_ADDED, this.childAdded)
		this.ref.off(CHILD_REMOVED, this.childRemoved)
		this.ref.off(CHILD_CHANGED, this.childUpdated)
	}

	push = (child) => {
		let newChild = this.ref.push()
		return dispatch =>  {
			let toSave ={id: newChild.key(), value: child}
			dispatch(autoAction(this.CREATE_START, toSave))
			return newChild.set(child)
				.then(() => {
					toast.success(`${this.singularName} created successfully`)
					dispatch(autoAction(this.CREATE_SUCCESS, toSave))
				}).catch(error => {
					toast.error(`An error occured creating the ${this.singularName}: ${error.code}`)
					dispatch(autoAction(this.CREATE_ERROR, Object.assign(toSave, {error})))
				})
		}
	}

	remove = (id) => {
		const child = this.ref.child(id)
		return dispatch => {
			dispatch(autoAction(this.REMOVE_START, id))
			child.remove()
				.then(() => {
					toast.success(`${this.singularName} removed successfully`)
					dispatch(autoAction(this.REMOVE_SUCCESS, id))
				}).catch(error => {
					toast.error(`An error occured removed the ${this.singularName}: ${error.code}`)
					dispatch(autoAction(this.REMOVE_ERROR, Object.assign(toSave, {error})))
				})
		}
	}

	update = (child, id) => {
		return dispatch => {		
			dispatch(autoAction(this.UPDATE_START, child))
			let toSave = Object.assign({}, child)
			delete toSave.id
			this.ref.child(id || child.id).set(toSave)
				.then(() => {
					toast.success(`${this.singularName} updated successfully`)
					dispatch(autoAction(this.UPDATE_SUCCESS, child))
				}).catch(error => {
					toast.error(`An error occured removed the ${this.singularName}: ${error.code}`)
					dispatch(autoAction(this.UPDATE_ERROR, Object.assign(child, {error})))
				})
		}
	}

	get reducer() {
		let defaultState = {
			items: Immutable.Map(),

			isCreating: false,
			createError: null,

			isRemoving: false,
			removeError: null,

			isUpdating: false,
			updateError: null
		}

		return function reducer(state = Immutable.Map(defaultState), action) {
			switch (action.type) {

			case this.ADDED:
			case this.UPDATED:
				return state.setIn(['items', action.payload.id], action.payload.value)
			case this.REMOVED:
				return state.deleteIn(['items', action.payload.id])

			case this.CREATE_START:
				return state.withMutations(s => {
					s.set('isCreating', true)
					 .set('createError', null)
				})
			case this.CREATE_SUCCESS:
				return state.withMutations(s => {
					s.set('isCreating', false)
				})
			case this.CREATE_ERROR:
				return state.withMutations(s => {
					s.set('isCreating', false)
					 .set('createError', action.payload)
				})

			case this.REMOVE_START:
				return state.withMutations(s => {
					s.set('isRemoving', true)
					 .set('removeError', null)
				})
			case this.REMOVE_SUCCESS:
				return state.withMutations(s => {
					s.set('isRemoving', false)
				})
			case this.REMOVE_ERROR:
				return state.withMutations(s => {
					s.set('isRemoving', false)
					 .set('removeError', action.payload)
				})

			case this.UPDATE_START:
				return state.withMutations(s => {
					s.set('isUpdating', true)
					 .set('updateError', null)
				})
			case this.UPDATE_SUCCESS:
				return state.withMutations(s => {
					s.set('isUpdating', false)
				})
			case this.UPDATE_ERROR:
				return state.withMutations(s => {
					s.set('isUpdating', false)
					 .set('updateError', action.payload)
				})

			default:
				return state
			}
		}.bind(this)
	}
}