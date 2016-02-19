var port = process.env.PORT || 9000,
    ip = process.env.IP || "0.0.0.0",
    isProduction = process.env.NODE_ENV == 'production',
    clientDir = __dirname + (isProduction ? '/dist/' : '/src/'),
    firebaseRef = process.env.firebaseRef || require(__dirname + '/env.json').firebaseRef,
    assetDir = __dirname + '/assets',
    jspmConfigName = '/jspm.config.js',
    jspmConfig = __dirname + jspmConfigName,
    jspmDir = __dirname + '/jspm_packages/',
    express = require('express'),
    engine = require('engine-handlebars'),
    fs = require('fs'),

    //Server
    bodyParser = require('body-parser'),
    app = express();

//Configure
app.use('/jspm_packages', express.static(jspmDir));
app.use(express.static(assetDir));
app.use('/src', express.static(clientDir));
app.use('/src/dist/dependencies.js', express.static(__dirname + '/dist/dependencies.js'));

//Serve dependencies
if (!isProduction) {
    app.use(jspmConfigName, express.static(jspmConfig));
}

//Allow JSON parsing
app.use(bodyParser.json());

require('./userRoute')(app);

var indexFile = fs.readFileSync(__dirname + '/index.hbs', 'utf8')
var index = engine.renderSync(indexFile, {
    isProduction: isProduction,
    firebaseRef: firebaseRef
})

//Index Route
app.get('/*', function(req, res){
    res.send(index);
});

//Start Listening
app.listen(port, ip);
console.log('Express server listening on port %d in %s mode', port, app.settings.env);
