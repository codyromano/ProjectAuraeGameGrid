import React from 'react';
import * as pages from 'aurae-pages';
import { routePaths } from './routes';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import primaryReducer from 'aurae-reducers/primaryReducer';
import { HashRouter, Route, Switch } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(),
  persistState()
);

const store = createStore(
  primaryReducer,
  enhancer
);

// TODO: Generate route hierarchy from config file
render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={routePaths.PLACE_RESOURCE} exact={true} component={pages.PlaceTileResource} />
        <Route path={routePaths.WEATHER_PAGE} exact={true} component={pages.WeatherPage} />
        <Route path={routePaths.MANAGE_RESOURCE} exact={true} component={pages.ManageResourcePage} />
        <Route path={routePaths.TILE_MAP} component={pages.GardenPage} />
      </Switch>
    </HashRouter>
  </Provider>,
document.getElementById('root'));
