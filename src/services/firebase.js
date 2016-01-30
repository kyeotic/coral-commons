import Firebase from 'firebase'

const rootFirebase = new Firebase("https://coral-commons-dev.firebaseio.com")

//rootFirebase.unauth()

export default rootFirebase

rootFirebase.child('users').on('value', function(users) {
	console.log('user loaded', users)
}, error => console.error('user error', error))