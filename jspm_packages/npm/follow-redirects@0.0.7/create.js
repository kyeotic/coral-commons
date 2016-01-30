/* */ 
(function(process) {
  'use strict';
  var url = require('url');
  var debug = require('debug')('follow-redirects');
  var assert = require('assert');
  var consume = require('stream-consume');
  module.exports = function(_nativeProtocols) {
    var nativeProtocols = {};
    var publicApi = {maxRedirects: 5};
    for (var p in _nativeProtocols) {
      if (_nativeProtocols.hasOwnProperty(p)) {
        assert(/^[A-Z][A-Z\+\-\.]*$/i.test(p), JSON.stringify(p) + ' is not a valid scheme name');
        generateWrapper(p, _nativeProtocols[p]);
      }
    }
    return publicApi;
    function execute(options) {
      var clientRequest;
      var fetchedUrls = [];
      return (clientRequest = cb());
      function cb(res) {
        if (res) {
          var fetchedUrl = url.format(options);
          fetchedUrls.unshift(fetchedUrl);
          if (!isRedirect(res)) {
            res.fetchedUrls = fetchedUrls;
            return options.userCallback(res);
          }
          consume(res);
          var redirectUrl = url.resolve(fetchedUrl, res.headers.location);
          debug('redirecting to', redirectUrl);
          wipeUrlProps(options);
          extend(options, url.parse(redirectUrl));
        }
        if (fetchedUrls.length > options.maxRedirects) {
          var err = new Error('Max redirects exceeded.');
          return forwardError(err);
        }
        options.nativeProtocol = nativeProtocols[options.protocol];
        options.defaultRequest = defaultMakeRequest;
        var req = (options.makeRequest || defaultMakeRequest)(options, cb, res);
        if (res) {
          req.on('error', forwardError);
        }
        return req;
      }
      function defaultMakeRequest(options, cb, res) {
        if (res) {
          options.method = 'GET';
        }
        var req = options.nativeProtocol.request(options, cb);
        if (res) {
          req.end();
        }
        return req;
      }
      function forwardError(err) {
        clientRequest.emit('error', err);
      }
    }
    function generateWrapper(scheme, nativeProtocol) {
      var wrappedProtocol = scheme + ':';
      var H = function() {};
      H.prototype = nativeProtocols[wrappedProtocol] = nativeProtocol;
      H = new H();
      publicApi[scheme] = H;
      H.request = function(options, callback) {
        return execute(parseOptions(options, callback, wrappedProtocol));
      };
      H.get = function(options, callback) {
        options = parseOptions(options, callback, wrappedProtocol);
        var req = execute(options);
        req.end();
        return req;
      };
    }
    function parseOptions(options, callback, wrappedProtocol) {
      assert.equal(typeof callback, 'function', 'callback must be a function');
      if ('string' === typeof options) {
        options = url.parse(options);
        options.maxRedirects = publicApi.maxRedirects;
      } else {
        options = extend({
          maxRedirects: publicApi.maxRedirects,
          protocol: wrappedProtocol
        }, options);
      }
      assert.equal(options.protocol, wrappedProtocol, 'protocol mismatch');
      options.protocol = wrappedProtocol;
      options.userCallback = callback;
      debug('options', options);
      return options;
    }
  };
  function extend(destination, source) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        destination[i] = source[i];
      }
    }
    return destination;
  }
  function isRedirect(res) {
    return (res.statusCode >= 300 && res.statusCode <= 399 && 'location' in res.headers);
  }
  function wipeUrlProps(options) {
    for (var i = 0,
        l = urlProps.length; i < l; ++i) {
      options[urlProps[i]] = null;
    }
  }
  var urlProps = ['protocol', 'slashes', 'auth', 'host', 'port', 'hostname', 'hash', 'search', 'query', 'pathname', 'path', 'href'];
})(require('process'));
