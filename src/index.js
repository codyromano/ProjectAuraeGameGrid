import React from 'react';
import * as pages from 'aurae-pages';
import { routePaths } from './routes';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import storeFactory from 'aurae-store/storeFactory';

const store = storeFactory({
  useLocalStorageMiddleware: false,
  useReduxDevTools: false
});

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
