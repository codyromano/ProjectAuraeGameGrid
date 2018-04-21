export const routePaths = {
  WEATHER_PAGE: '/weather',
  PLACE_RESOURCE: '/place',
  MANAGE_RESOURCE: '/item/:resourceId',
  VIEW_GARDEN: '/'
};

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
