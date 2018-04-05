import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

export const routePaths = {
  PLACE_RESOURCE: '/place',
  VIEW_GARDEN: '/'
};

export const routerRedirector = (history) => ({
  placeTileResource: () => {
    history.push(routePaths.PLACE_RESOURCE)
  }
});


/*
export const routesDefinition = [
  {
    path: routePaths.VIEW_GARDEN,
    component: App
  },
  {
    path: routePaths.PLACE_RESOURCE,
    component: 
  }
];

export const buildRoutes = (routesInfo) => (
  <HashRouter>
    <Switch>
      (routesInfo.map(route => (
        <Route
          path={routesInfo}
      )))
    </Switch>
  </HashRouter>
);


const store = createStore(primaryReducer);

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={URLs.PICK_VASE} component={App} />
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));
*/