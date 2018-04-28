import React from 'react';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import storeFactory from 'aurae-store/storeFactory';

const store = storeFactory({
  useLocalStorageMiddleware: false,
  useReduxDevTools: false
});

render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
document.getElementById('root'));
