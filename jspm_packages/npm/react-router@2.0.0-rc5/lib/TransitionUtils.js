/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports.runEnterHooks = runEnterHooks;
  exports.runLeaveHooks = runLeaveHooks;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _AsyncUtils = require('./AsyncUtils');
  var _warning = require('./warning');
  var _warning2 = _interopRequireDefault(_warning);
  function createEnterHook(hook, route) {
    return function(a, b, callback) {
      hook.apply(route, arguments);
      if (hook.length < 3) {
        callback();
      }
    };
  }
  function getEnterHooks(routes) {
    return routes.reduce(function(hooks, route) {
      if (route.onEnter)
        hooks.push(createEnterHook(route.onEnter, route));
      return hooks;
    }, []);
  }
  function runEnterHooks(routes, nextState, callback) {
    var hooks = getEnterHooks(routes);
    if (!hooks.length) {
      callback();
      return;
    }
    var redirectInfo = undefined;
    function replace(location, deprecatedPathname, deprecatedQuery) {
      if (deprecatedPathname) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : undefined;
        redirectInfo = {
          pathname: deprecatedPathname,
          query: deprecatedQuery,
          state: location
        };
        return;
      }
      redirectInfo = location;
    }
    _AsyncUtils.loopAsync(hooks.length, function(index, next, done) {
      hooks[index](nextState, replace, function(error) {
        if (error || redirectInfo) {
          done(error, redirectInfo);
        } else {
          next();
        }
      });
    }, callback);
  }
  function runLeaveHooks(routes) {
    for (var i = 0,
        len = routes.length; i < len; ++i) {
      if (routes[i].onLeave)
        routes[i].onLeave.call(routes[i]);
    }
  }
})(require('process'));
