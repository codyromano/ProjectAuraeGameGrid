import { CLASS_CURRENCY, CLASS_PLANT } from 'aurae-resource-classes';

// Actions
export const TILE_SELECTED = 'tileSelected';
export const PLACE_RESOURCE_CONFIRMED = 'confirmed';
export const RESOURCE_ACQUIRED = 'acquired';
export const RESOURCE_STAT_CHANGED = 'resourceStatChanged';
export const WEATHER_DATA_FETCHED = 'weatherFetched';

export const STAT_XP_LEVEL = 'level';
export const STAT_WATER_LEVEL = 'waterLevel';
export const STAT_OPERATOR_SET = 'setStatEquals';
export const STAT_OPERATOR_ADD = 'incrementStat';
export const STAT_OPERATOR_SUBTRACT = 'decrementStat';

export const tileSelected = (coords) => ({
  type: TILE_SELECTED,
  coords
});

export const weatherDataFetched = (serverResponse) => ({
  type: WEATHER_DATA_FETCHED,
  weatherData: serverResponse
});

export const currencyResourceAcquired = (name, addAmount) => ({
  id: name,
  type: RESOURCE_ACQUIRED,
  class: CLASS_CURRENCY,
  resource: {
    name,
    addAmount
  }
});

export const plantResourceAcquired = (resource, selectedCoords) => {
  return ({
    id: resource.id,
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

export const resourceStatChanged = (
  resourceId,
  statName,
  statValue,
  operator = 'set'
) => ({
  type: RESOURCE_STAT_CHANGED,
  resourceId,
  statName,
  statValue,
  operator
});
