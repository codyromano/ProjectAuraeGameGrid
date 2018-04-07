export const routePaths = {
  PLACE_RESOURCE: '/place',
  VIEW_GARDEN: '/'
};

export const routerRedirector = (history) => ({
  placeTileResource: () => {
    history.push(routePaths.PLACE_RESOURCE)
  }
});
