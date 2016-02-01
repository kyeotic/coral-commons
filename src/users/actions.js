import FirebaseListHandler from 'util/firebaseListHandler'
import Firebase from 'util/firebase'

export default new FirebaseListHandler(Firebase.child('users'), { name: 'User' })