var Mocha = require('mocha'),
    glob = require('glob')

require('babel/register')

// Instantiate a Mocha instance.
var mocha = new Mocha()

glob.sync('src/**/*.test.js').forEach(function(file) {
  mocha.addFile(file)
})


var System = require('systemjs')
require('../jspm.config.js')

System.delete(System.normalizeSync('util/http'));
System.set(System.normalizeSync('util/http'), System.newModule({ default: { } }));

System.delete(System.normalizeSync('util/toast'));
System.set(System.normalizeSync('util/toast'), System.newModule({ default: { } }));

System.delete(System.normalizeSync('util/confirm'));
System.set(System.normalizeSync('util/confirm'), System.newModule({ default: { } }));

System.delete(System.normalizeSync('util/firebase'));
System.set(System.normalizeSync('util/firebase'), System.newModule({
  default: {
    child: function() {}
  },
  subscribeToFirebase: function() {} })
);


// Run the tests.
mocha.run(function(failures){
    process.on('exit', function () {
        process.exit(failures)
    })
})