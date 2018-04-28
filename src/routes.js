import React from 'react';
import * as pages from 'aurae-pages';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routePaths from 'aurae-config/routePaths';

export const routerRedirector = (history) => ({
  placeTileResource() {
    history.push(routePaths.PLACE_RESOURCE)
  },
  manageResource(resource) {
    const path = routePaths.MANAGE_RESOURCE.replace(
      ':resourceId',
      resource.id
    );
    history.push(path);
  }
});

export const AppRoutes = () => (
  <HashRouter>
    <Switch>
      <Route path={routePaths.PLACE_RESOURCE} exact={true} component={pages.PlaceTileResource} />
      <Route path={routePaths.WEATHER_PAGE} exact={true} component={pages.WeatherPage} />
      <Route path={routePaths.MANAGE_RESOURCE} exact={true} component={pages.ManageResourcePage} />
      <Route path={routePaths.TILE_MAP} component={pages.GardenPage} />
    </Switch>
  </HashRouter>
);
