/* */ 
(function(process) {
  'use strict';
  module.exports = function dispatchRequest(config) {
    return new Promise(function executor(resolve, reject) {
      try {
        var adapter;
        if (typeof config.adapter === 'function') {
          adapter = config.adapter;
        } else if (typeof XMLHttpRequest !== 'undefined') {
          adapter = require('../adapters/xhr');
        } else if (typeof process !== 'undefined') {
          adapter = require('../adapters/xhr');
        }
        if (typeof adapter === 'function') {
          adapter(resolve, reject, config);
        }
      } catch (e) {
        reject(e);
      }
    });
  };
})(require('process'));
