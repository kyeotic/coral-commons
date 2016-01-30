/* */ 
'use strict';
var utils = require('../utils');
var buildURL = require('../helpers/buildURL');
var parseHeaders = require('../helpers/parseHeaders');
var transformData = require('../helpers/transformData');
var isURLSameOrigin = require('../helpers/isURLSameOrigin');
var btoa = window.btoa || require('../helpers/btoa');
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
    var cookies = require('../helpers/cookies');
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
