// Actions
// TODO: Use enum
export const TILE_SELECTED = 'tileSelected';
export const PLACE_RESOURCE_CONFIRMED = 'confirmed';
export const RESOURCE_ACQUIRED = 'acquired';
export const WEATHER_DATA_FETCHED = 'weatherFetched';

// TODO: Move to game object class def file
export const CLASS_PLANT = 'plant';
export const CLASS_CURRENCY = 'currency';

export const tileSelected = (coords) => ({
  type: TILE_SELECTED,
  coords
});

export const weatherDataFetched = (serverResponse) => ({
  type: WEATHER_DATA_FETCHED,
  weatherData: serverResponse
});

export const currencyResourceAcquired = (name, amount) => ({
  type: RESOURCE_ACQUIRED,
  class: CLASS_CURRENCY,
  resource: {
    name,
    amount
  }
});

export const plantResourceAcquired = (resource, selectedCoords) => {
  return ({
    type: RESOURCE_ACQUIRED,
    class: CLASS_PLANT,
    selectedCoords,
    resource
  });
};

export const resourceSelectionConfirmed = (resource) => {
  return ({
    type: PLACE_RESOURCE_CONFIRMED,
    resource
  });
};
