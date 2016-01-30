import Firebase from 'firebase'
import { updateEmail } from 'actions/auth'

const rootFirebase = new Firebase("https://coral-commons-dev.firebaseio.com")

//rootFirebase.unauth()

export default rootFirebase

export function getAuth(dispatch) {
	rootFirebase.onAuth(auth => {
		if (!auth) {
			return console.log('Unauthenticed')
		}
		dispatch(updateEmail(auth.password.email))
	})
}



/*rootFirebase.child('users').on('value', function(users) {
	console.log('user loaded', users.val())
}, error => console.error('user error', error))*/