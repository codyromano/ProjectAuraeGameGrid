import React from 'react';
import * as pages from './components/pages';
import { routePaths } from './routes';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore } from 'redux';
import primaryReducer from './store/reducers/primaryReducer';
import { HashRouter, Route, Switch } from 'react-router-dom';

const store = createStore(
  primaryReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
