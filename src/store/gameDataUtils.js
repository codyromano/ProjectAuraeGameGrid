export const serializeGameObjectLocation = (x, y) => [x, y].join(',');

export const getGameObjectsInPosition = (reduxState, coords) => {
  const locationKey = serializeGameObjectLocation(coords);
  const resourceIds = reduxState.resources.byPosition[locationKey] || [];

  return resourceIds.map(id => reduxState.resources.byId[id]);
};
