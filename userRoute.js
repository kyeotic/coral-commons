var firebaseSecret = process.env.firebaseSecret || require(__dirname + '/env.json').firebaseSecret,
    request = require('request-promise'),
    newUserRole = 'Unverified',
    firebaseRef = process.env.firebaseRef || require(__dirname + '/env.json').firebaseRef;

module.exports = userRoute;

function userRoute(app) {
	app.post('/users', setupUser);
}

var getUsersRequest = {
    uri: firebaseName + '/users.json',
    qs: { auth: firebaseSecret},
    json: true 
};

function createUserRequest(uid, name) {
	return {
		uri: firebaseName +'/users/' + uid + '.json',
		method: 'PUT',
	    qs: { auth: firebaseSecret},
	    body: {
	    	role: newUserRole,
	    	name: name
	    },
	    json: true 
	}
};

function setupUser(req, res) {
	if (!req.body.uid || !req.body.name) {
		res.status(403).json({ message: 'User setup requires uid and name.' });
		return;
	}
	request(getUsersRequest)
	    .then(function(users) {
	        //Create User
	        if (users && users[req.body.uid] !== undefined) {
	            res.json({ message: 'already setup.'});
	            return;
	        }
	     	return request(createUserRequest(req.body.uid, req.body.name));
	    })
	    .then(function(response) {
	    	res.json({ message: 'Success'});
	    })
	    .catch(function(error) {
	        console.log('error in get', error);
	        res.status(500).json({ message: 'Unable to connect to data store', error: error });
	    });
}