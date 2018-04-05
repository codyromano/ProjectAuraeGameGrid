import React from 'react';
import PropTypes from 'prop-types';
import App from './components/App';
import * as pages from './components/pages';
import { routePaths } from './routes';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore } from 'redux';
import primaryReducer from './store/reducers/primaryReducer';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

const store = createStore(primaryReducer);

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={routePaths.PLACE_RESOURCE} exact={true} component={pages.PlaceTileResource} />
        <Route path={routePaths.TILE_MAP} component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
document.getElementById('root'));
