/* */ 
"format cjs";
(function(process) {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
    else if (typeof define === 'function' && define.amd)
      define([], factory);
    else if (typeof exports === 'object')
      exports["axios"] = factory();
    else
      root["axios"] = factory();
  })(this, function() {
    return (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    })([function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var defaults = __webpack_require__(2);
      var utils = __webpack_require__(3);
      var dispatchRequest = __webpack_require__(4);
      var InterceptorManager = __webpack_require__(12);
      var isAbsoluteURL = __webpack_require__(13);
      var combineURLs = __webpack_require__(14);
      var bind = __webpack_require__(15);
      var transformData = __webpack_require__(8);
      function Axios(defaultConfig) {
        this.defaults = utils.merge({}, defaultConfig);
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }
      Axios.prototype.request = function request(config) {
        if (typeof config === 'string') {
          config = utils.merge({url: arguments[0]}, arguments[1]);
        }
        config = utils.merge(defaults, this.defaults, {method: 'get'}, config);
        if (config.baseURL && !isAbsoluteURL(config.url)) {
          config.url = combineURLs(config.baseURL, config.url);
        }
        config.withCredentials = config.withCredentials || this.defaults.withCredentials;
        config.data = transformData(config.data, config.headers, config.transformRequest);
        config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
        utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
          delete config.headers[method];
        });
        var chain = [dispatchRequest, undefined];
        var promise = Promise.resolve(config);
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      };
      var defaultInstance = new Axios(defaults);
      var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
      axios.create = function create(defaultConfig) {
        return new Axios(defaultConfig);
      };
      axios.defaults = defaultInstance.defaults;
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = __webpack_require__(16);
      axios.interceptors = defaultInstance.interceptors;
      utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url
          }));
        };
        axios[method] = bind(Axios.prototype[method], defaultInstance);
      });
      utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
        Axios.prototype[method] = function(url, data, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data
          }));
        };
        axios[method] = bind(Axios.prototype[method], defaultInstance);
      });
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      var PROTECTION_PREFIX = /^\)\]\}',?\n/;
      var DEFAULT_CONTENT_TYPE = {'Content-Type': 'application/x-www-form-urlencoded'};
      module.exports = {
        transformRequest: [function transformResponseJSON(data, headers) {
          if (utils.isFormData(data)) {
            return data;
          }
          if (utils.isArrayBuffer(data)) {
            return data;
          }
          if (utils.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
            if (!utils.isUndefined(headers)) {
              utils.forEach(headers, function processContentTypeHeader(val, key) {
                if (key.toLowerCase() === 'content-type') {
                  headers['Content-Type'] = val;
                }
              });
              if (utils.isUndefined(headers['Content-Type'])) {
                headers['Content-Type'] = 'application/json;charset=utf-8';
              }
            }
            return JSON.stringify(data);
          }
          return data;
        }],
        transformResponse: [function transformResponseJSON(data) {
          if (typeof data === 'string') {
            data = data.replace(PROTECTION_PREFIX, '');
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          return data;
        }],
        headers: {
          common: {'Accept': 'application/json, text/plain, */*'},
          patch: utils.merge(DEFAULT_CONTENT_TYPE),
          post: utils.merge(DEFAULT_CONTENT_TYPE),
          put: utils.merge(DEFAULT_CONTENT_TYPE)
        },
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
      };
    }, function(module, exports) {
      'use strict';
      var toString = Object.prototype.toString;
      function isArray(val) {
        return toString.call(val) === '[object Array]';
      }
      function isArrayBuffer(val) {
        return toString.call(val) === '[object ArrayBuffer]';
      }
      function isFormData(val) {
        return toString.call(val) === '[object FormData]';
      }
      function isArrayBufferView(val) {
        var result;
        if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
          result = ArrayBuffer.isView(val);
        } else {
          result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
        }
        return result;
      }
      function isString(val) {
        return typeof val === 'string';
      }
      function isNumber(val) {
        return typeof val === 'number';
      }
      function isUndefined(val) {
        return typeof val === 'undefined';
      }
      function isObject(val) {
        return val !== null && typeof val === 'object';
      }
      function isDate(val) {
        return toString.call(val) === '[object Date]';
      }
      function isFile(val) {
        return toString.call(val) === '[object File]';
      }
      function isBlob(val) {
        return toString.call(val) === '[object Blob]';
      }
      function trim(str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '');
      }
      function isStandardBrowserEnv() {
        return (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function');
      }
      function forEach(obj, fn) {
        if (obj === null || typeof obj === 'undefined') {
          return;
        }
        if (typeof obj !== 'object' && !isArray(obj)) {
          obj = [obj];
        }
        if (isArray(obj)) {
          for (var i = 0,
              l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              fn.call(null, obj[key], key, obj);
            }
          }
        }
      }
      function merge() {
        var result = {};
        function assignValue(val, key) {
          if (typeof result[key] === 'object' && typeof val === 'object') {
            result[key] = merge(result[key], val);
          } else {
            result[key] = val;
          }
        }
        for (var i = 0,
            l = arguments.length; i < l; i++) {
          forEach(arguments[i], assignValue);
        }
        return result;
      }
      module.exports = {
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isFormData: isFormData,
        isArrayBufferView: isArrayBufferView,
        isString: isString,
        isNumber: isNumber,
        isObject: isObject,
        isUndefined: isUndefined,
        isDate: isDate,
        isFile: isFile,
        isBlob: isBlob,
        isStandardBrowserEnv: isStandardBrowserEnv,
        forEach: forEach,
        merge: merge,
        trim: trim
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      module.exports = function dispatchRequest(config) {
        return new Promise(function executor(resolve, reject) {
          try {
            var adapter;
            if (typeof config.adapter === 'function') {
              adapter = config.adapter;
            } else if (typeof XMLHttpRequest !== 'undefined') {
              adapter = __webpack_require__(5);
            } else if (typeof process !== 'undefined') {
              adapter = __webpack_require__(5);
            }
            if (typeof adapter === 'function') {
              adapter(resolve, reject, config);
            }
          } catch (e) {
            reject(e);
          }
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      var buildURL = __webpack_require__(6);
      var parseHeaders = __webpack_require__(7);
      var transformData = __webpack_require__(8);
      var isURLSameOrigin = __webpack_require__(9);
      var btoa = window.btoa || __webpack_require__(10);
      module.exports = function xhrAdapter(resolve, reject, config) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type'];
        }
        var request = new XMLHttpRequest();
        if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
          request = new window.XDomainRequest();
        }
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password || '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onload = function handleLoad() {
          if (!request) {
            return;
          }
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
          var response = {
            data: transformData(responseData, responseHeaders, config.transformResponse),
            status: request.status === 1223 ? 204 : request.status,
            statusText: request.status === 1223 ? 'No Content' : request.statusText,
            headers: responseHeaders,
            config: config
          };
          ((response.status >= 200 && response.status < 300) || (!('status' in request) && response.responseText) ? resolve : reject)(response);
          request = null;
        };
        request.onerror = function handleError() {
          reject(new Error('Network Error'));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var cookies = __webpack_require__(11);
          var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ? cookies.read(config.xsrfCookieName) : undefined;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (config.withCredentials) {
          request.withCredentials = true;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (request.responseType !== 'json') {
              throw e;
            }
          }
        }
        if (utils.isArrayBuffer(requestData)) {
          requestData = new DataView(requestData);
        }
        request.send(requestData);
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
      }
      module.exports = function buildURL(url, params, paramsSerializer) {
        if (!params) {
          return url;
        }
        var serializedParams;
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
        } else {
          var parts = [];
          utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
              return;
            }
            if (utils.isArray(val)) {
              key = key + '[]';
            }
            if (!utils.isArray(val)) {
              val = [val];
            }
            utils.forEach(val, function parseValue(v) {
              if (utils.isDate(v)) {
                v = v.toISOString();
              } else if (utils.isObject(v)) {
                v = JSON.stringify(v);
              }
              parts.push(encode(key) + '=' + encode(v));
            });
          });
          serializedParams = parts.join('&');
        }
        if (serializedParams) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
        return url;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      module.exports = function parseHeaders(headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
          return parsed;
        }
        utils.forEach(headers.split('\n'), function parser(line) {
          i = line.indexOf(':');
          key = utils.trim(line.substr(0, i)).toLowerCase();
          val = utils.trim(line.substr(i + 1));
          if (key) {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        });
        return parsed;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      module.exports = function transformData(data, headers, fns) {
        utils.forEach(fns, function transform(fn) {
          data = fn(data, headers);
        });
        return data;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute('href', href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol && parsed.host === originURL.host);
        };
      })() : (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })());
    }, function(module, exports) {
      'use strict';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      function InvalidCharacterError(message) {
        this.message = message;
      }
      InvalidCharacterError.prototype = new Error;
      InvalidCharacterError.prototype.code = 5;
      InvalidCharacterError.prototype.name = 'InvalidCharacterError';
      function btoa(input) {
        var str = String(input);
        var output = '';
        for (var block,
            charCode,
            idx = 0,
            map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 0xFF) {
            throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
          }
          block = block << 8 | charCode;
        }
        return output;
      }
      module.exports = btoa;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }
            if (secure === true) {
              cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },
          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() : (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
      })());
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(3);
      function InterceptorManager() {
        this.handlers = [];
      }
      InterceptorManager.prototype.use = function use(fulfilled, rejected) {
        this.handlers.push({
          fulfilled: fulfilled,
          rejected: rejected
        });
        return this.handlers.length - 1;
      };
      InterceptorManager.prototype.eject = function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      };
      InterceptorManager.prototype.forEach = function forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      };
      module.exports = InterceptorManager;
    }, function(module, exports) {
      'use strict';
      module.exports = function isAbsoluteURL(url) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function combineURLs(baseURL, relativeURL) {
        return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function bind(fn, thisArg) {
        return function wrap() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          return fn.apply(thisArg, args);
        };
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      };
    }]);
  });
  ;
})(require('process'));
