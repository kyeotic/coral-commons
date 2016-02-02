import FirebaseListHandler from 'util/firebaseListHandler'
import Firebase from 'util/firebase'

export default new FirebaseListHandler(Firebase.child('bulletins'), { 
	name: 'Bulletin',
	query: Firebase.child('bulletins').limitToLast(5)
})