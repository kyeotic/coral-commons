import React from 'react';
import { render } from 'react-dom';
import Root from 'root/root';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'root/reducer';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createConfiguredStore = applyMiddleware(thunkMiddleware, reduxRouterMiddleware)(createStore);

const configureStore = (initialState) => createConfiguredStore(rootReducer, initialState)

const appRoot = document.getElementById('app-host');
render(<Root store={configureStore()} />, appRoot);