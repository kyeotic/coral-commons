/* */ 
(function(process) {
  'use strict';
  var utils = require('./utils');
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
})(require('process'));
