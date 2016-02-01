import FirebaseListHandler from 'util/firebaseListHandler'
import Firebase from 'util/firebase'

const housesHandler = new FirebaseListHandler(Firebase.child('houses'), { name: 'House' })

export default housesHandler