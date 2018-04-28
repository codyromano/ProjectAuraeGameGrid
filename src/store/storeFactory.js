import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import primaryReducer from 'aurae-reducers/primaryReducer';

const defaultPrimaryReducer = primaryReducer;

export default function storeFactory({
  primaryReducer = defaultPrimaryReducer,
  useReduxDevTools = true,
  useLocalStorageMiddleware = true
}) {
  let composeEnhancers = compose;
  if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && useReduxDevTools) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const middleware = [applyMiddleware()];
  if (useLocalStorageMiddleware) {
    middleware.push(persistState());
  }

  const enhancer = composeEnhancers(...middleware);
  return createStore(primaryReducer, enhancer);
}
