import action from 'util/actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'util/firebase'

//This is not yet ready for use

class FirebaseListHandler {
	constructor(firebaseRef) {
		this.ref = firebaseRef

		//Firebase subscriptions
		this.ADDED = new Symbol('ADDED')
		this.REMOVED = new Symbol('REMOVED')
		this.UPDATED = new Symbol('UPDATED')
		this.childAdded = action(this.ADDED)
		this.childRemoved = action(this.REMOVED)
		this.childUpdated = action(this.UPDATED)

		//Actions
		this.CREATE_START = new Symbol('CREATE_START')
		this.CREATE_SUCCESS = new Symbol('CREATE_SUCCESS')
		this.CREATE_ERROR = new Symbol('CREATE_ERROR')
		this.createStart = action(this.CREATE_START)
		this.createSuccess = action(this.CREATE_SUCCESS)
		this.createError = action(this.CREATE_ERROR)
	}

	startListening(dispatch) {
		this.ref.on(CHILD_ADDED, snapshot => 
			dispatch(this.childAdded({id: snapshot.key(), value: snapshot.val()})))
		this.ref.on(CHILD_REMOVED, snapshot => 
			dispatch(this.childRemoved({id: snapshot.key()})))
		this.ref.on(CHILD_CHANGED, snapshot => 
			dispatch(this.childUpdated({id: snapshot.key(), value: snapshot.val()})))
	}

	stopListening() {
		this.ref.off(CHILD_ADDED, this.childAdded)
		this.ref.off(CHILD_REMOVED, this.childRemoved)
		this.ref.off(CHILD_CHANGED, this.childUpdated)
	}

	createChild(child) {
		let newChild = this.ref.push()
		return dispatch =>  {
			let toSave ={id: newChild.key(), value: child}
			dispatch(this.createStart(toSave))
			return newChild.set(child)
				.then(() 
					=> dispatch(this.createSuccess(toSave)))
				.catch(error =>
					dispatch(this.createError(Object.assign(toSave, {error}))))
		}
	}
}