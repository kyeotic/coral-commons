import FirebaseListHandler from 'util/firebaseListHandler'
import Firebase from 'util/firebase'
import residentsRef from 'residents/actions'

const usersRef = new FirebaseListHandler(Firebase.child('users'), { name: 'User' })

usersRef.updateUserResident = function({userId, residentId}) {
	return (dispatch, getState) => {
		var state = getState()
		var users = state.users.get('items').toJS()
		var residents = state.residents.get('items').toJS()

		var promises = []

		//Unmap both objects
		if ((userId && !residentId) || (residentId && !userId)) {
			var user
			var resident
			if (userId) {
				user = users[userId]
				resident = residents[user.residentId]
				residentId = user.residentId
			}
			if (residentId) {
				resident = residents[residentId]
				user = users[resident.userId]
				userId = resident.userId
			}
			delete user.residentId
			delete resident.userId			
			
			return Promise.all([
				residentsRef.update(resident, residentId)(dispatch),
				usersRef.update(user, userId)(dispatch)
			])
		}

		//Remove Old
		//
		var oldResidentId = users[userId].residentId
		var oldUserId = residents[residentId].userId

		if (oldResidentId == residentId && oldUserId == userId)
			return

		//User has previous resident mapping that should be removed
		if (oldResidentId && oldResidentId !== residentId) {
			var oldResident = residents[oldResidentId]
			delete oldResident.userId
			promises.push(residentsRef.update(oldResident, oldResidentId)(dispatch))
		}
		
		//Resident has previous user mapping that should be removed
		if (oldUserId && oldUserId !== userId) {
			var olduser = users[oldUserId]
			delete olduser.userId
			promises.push(usersRef.update(olduser, oldUserId)(dispatch))
		}

		//Map new values
		var user = users[userId]
		var resident = residents[residentId]

		user.residentId = residentId
		resident.userId = userId

		promises.push(usersRef.update(user, userId)(dispatch))
		promises.push(residentsRef.update(resident, residentId)(dispatch))		

		return Promise.all(promises)
	}
}

export default usersRef
