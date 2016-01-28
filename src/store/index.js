import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const createConfiguredStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return createConfiguredStore(rootReducer, initialState);
}