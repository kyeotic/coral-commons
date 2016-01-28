import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createConfiguredStore = applyMiddleware(thunkMiddleware, reduxRouterMiddleware)(createStore);

export default function configureStore(initialState) {
  return createConfiguredStore(rootReducer, initialState);
}