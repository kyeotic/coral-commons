var port = process.env.PORT || 9000,
    ip = process.env.IP || "0.0.0.0",
    isProduction = process.env.NODE_ENV == 'production',
    clientDir = __dirname + (isProduction ? '/dist/' : '/src/'),
    assetDir = __dirname + '/assets',
    jspmConfigName = '/jspm.config.js',
    jspmConfig = __dirname + jspmConfigName,
    jspmDir = __dirname + '/jspm_packages/',
    express = require('express'),
    firebaseSecret = process.env.firebaseSecret || require(__dirname + '/env.json').firebaseSecret,
    request = require('request-promise'),

    //Server
    bodyParser = require('body-parser'),
    app = express();

//Configure
app.use('/jspm_packages', express.static(jspmDir));
app.use('/assets', express.static(assetDir));
app.use('/src', express.static(clientDir));
app.use('/src/dist/dependencies.js', express.static(__dirname + '/dist/dependencies.js'));

//Serve dependencies
if (!isProduction) {
    app.use(jspmConfigName, express.static(jspmConfig));
}

//Allow JSON parsing
app.use(bodyParser.json());

//Create User
var getUsers = {
  uri: 'https://coral-commons-dev.firebaseio.com/users.json',
    qs: { auth: firebaseSecret},
    json: true 
};
app.post('/user', function(req, res) {
    request(getUsers)
        .then(function(users) {
            //Create User
            if (!users || true) {
                res.json({ message: 'able to create '});
            }
            else {
                res.status(403).json({ message: 'User already exists.' });
            }
        })
        .catch(function(error) {
            console.log('error in get', error);
            res.status(500).json({ message: 'Unable to connect to data store', error: error });
        });
});

//Index Route
app.get('/*', function(req, res){
    res.sendFile(__dirname + (isProduction ? '/index-built.html' : '/index.html'));
});

//Start Listening
app.listen(port, ip);
console.log('Express server listening on port %d in %s mode', port, app.settings.env);
