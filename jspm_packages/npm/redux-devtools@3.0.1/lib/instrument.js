/* */ 
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports.ActionCreators = exports.ActionTypes = undefined;
exports.default = instrument;

var _difference = require('lodash/array/difference');

var _difference2 = _interopRequireDefault(_difference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var ActionTypes = exports.ActionTypes = {
  PERFORM_ACTION: 'PERFORM_ACTION',
  RESET: 'RESET',
  ROLLBACK: 'ROLLBACK',
  COMMIT: 'COMMIT',
  SWEEP: 'SWEEP',
  TOGGLE_ACTION: 'TOGGLE_ACTION',
  JUMP_TO_STATE: 'JUMP_TO_STATE',
  IMPORT_STATE: 'IMPORT_STATE'
};

/**
 * Action creators to change the History state.
 */
var ActionCreators = exports.ActionCreators = {
  performAction: function performAction(action) {
    return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
  },
  reset: function reset() {
    return { type: ActionTypes.RESET, timestamp: Date.now() };
  },
  rollback: function rollback() {
    return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
  },
  commit: function commit() {
    return { type: ActionTypes.COMMIT, timestamp: Date.now() };
  },
  sweep: function sweep() {
    return { type: ActionTypes.SWEEP };
  },
  toggleAction: function toggleAction(id) {
    return { type: ActionTypes.TOGGLE_ACTION, id: id };
  },
  jumpToState: function jumpToState(index) {
    return { type: ActionTypes.JUMP_TO_STATE, index: index };
  },
  importState: function importState(nextLiftedState) {
    return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState };
  }
};

var INIT_ACTION = { type: '@@INIT' };

/**
 * Computes the next entry in the log by applying an action.
 */
function computeNextEntry(reducer, action, state, error) {
  if (error) {
    return {
      state: state,
      error: 'Interrupted by an error up the chain'
    };
  }

  var nextState = state;
  var nextError = undefined;
  try {
    nextState = reducer(state, action);
  } catch (err) {
    nextError = err.toString();
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.chrome !== 'undefined') {
      // In Chrome, rethrowing provides better source map support
      setTimeout(function () {
        throw err;
      });
    } else {
      console.error(err.stack || err);
    }
  }

  return {
    state: nextState,
    error: nextError
  };
}

/**
 * Runs the reducer on invalidated actions to get a fresh computation log.
 */
function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds) {
  // Optimization: exit early and return the same reference
  // if we know nothing could have changed.
  if (minInvalidatedStateIndex >= computedStates.length && computedStates.length === stagedActionIds.length) {
    return computedStates;
  }

  var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
  for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
    var actionId = stagedActionIds[i];
    var action = actionsById[actionId].action;

    var previousEntry = nextComputedStates[i - 1];
    var previousState = previousEntry ? previousEntry.state : committedState;
    var previousError = previousEntry ? previousEntry.error : undefined;

    var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
    var entry = shouldSkip ? previousEntry : computeNextEntry(reducer, action, previousState, previousError);

    nextComputedStates.push(entry);
  }

  return nextComputedStates;
}

/**
 * Lifts an app's action into an action on the lifted store.
 */
function liftAction(action) {
  return ActionCreators.performAction(action);
}

/**
 * Creates a history state reducer from an app's reducer.
 */
function liftReducerWith(reducer, initialCommittedState, monitorReducer) {
  var initialLiftedState = {
    monitorState: monitorReducer(undefined, {}),
    nextActionId: 1,
    actionsById: { 0: liftAction(INIT_ACTION) },
    stagedActionIds: [0],
    skippedActionIds: [],
    committedState: initialCommittedState,
    currentStateIndex: 0,
    computedStates: []
  };

  /**
   * Manages how the history actions modify the history state.
   */
  return function () {
    var liftedState = arguments.length <= 0 || arguments[0] === undefined ? initialLiftedState : arguments[0];
    var liftedAction = arguments[1];
    var monitorState = liftedState.monitorState;
    var actionsById = liftedState.actionsById;
    var nextActionId = liftedState.nextActionId;
    var stagedActionIds = liftedState.stagedActionIds;
    var skippedActionIds = liftedState.skippedActionIds;
    var committedState = liftedState.committedState;
    var currentStateIndex = liftedState.currentStateIndex;
    var computedStates = liftedState.computedStates;

    // By default, agressively recompute every state whatever happens.
    // This has O(n) performance, so we'll override this to a sensible
    // value whenever we feel like we don't have to recompute the states.

    var minInvalidatedStateIndex = 0;

    switch (liftedAction.type) {
      case ActionTypes.RESET:
        {
          // Get back to the state the store was created with.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          committedState = initialCommittedState;
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.COMMIT:
        {
          // Consider the last committed state the new starting point.
          // Squash any staged actions into a single committed state.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          committedState = computedStates[currentStateIndex].state;
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.ROLLBACK:
        {
          // Forget about any staged actions.
          // Start again from the last committed state.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.TOGGLE_ACTION:
        {
          var _ret = (function () {
            // Toggle whether an action with given ID is skipped.
            // Being skipped means it is a no-op during the computation.
            var actionId = liftedAction.id;

            var index = skippedActionIds.indexOf(actionId);
            if (index === -1) {
              skippedActionIds = [actionId].concat(skippedActionIds);
            } else {
              skippedActionIds = skippedActionIds.filter(function (id) {
                return id !== actionId;
              });
            }
            // Optimization: we know history before this action hasn't changed
            minInvalidatedStateIndex = stagedActionIds.indexOf(actionId);
            return 'break';
          })();

          if (_ret === 'break') break;
        }
      case ActionTypes.JUMP_TO_STATE:
        {
          // Without recomputing anything, move the pointer that tell us
          // which state is considered the current one. Useful for sliders.
          currentStateIndex = liftedAction.index;
          // Optimization: we know the history has not changed.
          minInvalidatedStateIndex = Infinity;
          break;
        }
      case ActionTypes.SWEEP:
        {
          // Forget any actions that are currently being skipped.
          stagedActionIds = (0, _difference2.default)(stagedActionIds, skippedActionIds);
          skippedActionIds = [];
          currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
          break;
        }
      case ActionTypes.PERFORM_ACTION:
        {
          if (currentStateIndex === stagedActionIds.length - 1) {
            currentStateIndex++;
          }
          var actionId = nextActionId++;
          // Mutation! This is the hottest path, and we optimize on purpose.
          // It is safe because we set a new key in a cache dictionary.
          actionsById[actionId] = liftedAction;
          stagedActionIds = [].concat(stagedActionIds, [actionId]);
          // Optimization: we know that only the new action needs computing.
          minInvalidatedStateIndex = stagedActionIds.length - 1;
          break;
        }
      case ActionTypes.IMPORT_STATE:
        {
          var _liftedAction$nextLif = liftedAction.nextLiftedState;
          // Completely replace everything.

          monitorState = _liftedAction$nextLif.monitorState;
          actionsById = _liftedAction$nextLif.actionsById;
          nextActionId = _liftedAction$nextLif.nextActionId;
          stagedActionIds = _liftedAction$nextLif.stagedActionIds;
          skippedActionIds = _liftedAction$nextLif.skippedActionIds;
          committedState = _liftedAction$nextLif.committedState;
          currentStateIndex = _liftedAction$nextLif.currentStateIndex;
          computedStates = _liftedAction$nextLif.computedStates;

          break;
        }
      case '@@redux/INIT':
        {
          // Always recompute states on hot reload and init.
          minInvalidatedStateIndex = 0;
          break;
        }
      default:
        {
          // If the action is not recognized, it's a monitor action.
          // Optimization: a monitor action can't change history.
          minInvalidatedStateIndex = Infinity;
          break;
        }
    }

    computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
    monitorState = monitorReducer(monitorState, liftedAction);
    return {
      monitorState: monitorState,
      actionsById: actionsById,
      nextActionId: nextActionId,
      stagedActionIds: stagedActionIds,
      skippedActionIds: skippedActionIds,
      committedState: committedState,
      currentStateIndex: currentStateIndex,
      computedStates: computedStates
    };
  };
}

/**
 * Provides an app's view into the state of the lifted store.
 */
function unliftState(liftedState) {
  var computedStates = liftedState.computedStates;
  var currentStateIndex = liftedState.currentStateIndex;
  var state = computedStates[currentStateIndex].state;

  return state;
}

/**
 * Provides an app's view into the lifted store.
 */
function unliftStore(liftedStore, liftReducer) {
  var lastDefinedState = undefined;

  return _extends({}, liftedStore, {

    liftedStore: liftedStore,

    dispatch: function dispatch(action) {
      liftedStore.dispatch(liftAction(action));
      return action;
    },
    getState: function getState() {
      var state = unliftState(liftedStore.getState());
      if (state !== undefined) {
        lastDefinedState = state;
      }
      return lastDefinedState;
    },
    replaceReducer: function replaceReducer(nextReducer) {
      liftedStore.replaceReducer(liftReducer(nextReducer));
    }
  });
}

/**
 * Redux instrumentation store enhancer.
 */
function instrument() {
  var monitorReducer = arguments.length <= 0 || arguments[0] === undefined ? function () {
    return null;
  } : arguments[0];

  return function (createStore) {
    return function (reducer, initialState) {
      function liftReducer(r) {
        return liftReducerWith(r, initialState, monitorReducer);
      }

      var liftedStore = createStore(liftReducer(reducer));
      return unliftStore(liftedStore, liftReducer);
    };
  };
}