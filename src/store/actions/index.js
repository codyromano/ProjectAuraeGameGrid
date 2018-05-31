import { CLASS_CURRENCY, CLASS_PLANT, CLASS_TREAT } from 'aurae-config/resourceClasses';

// Actions
export const TILE_SELECTED = 'tileSelected';
export const PLACE_RESOURCE_CONFIRMED = 'confirmed';
export const RESOURCE_EVOLVED = 'resourceEvolved';
export const RESOURCE_ACQUIRED = 'acquired';
export const RESOURCE_DELETED = 'resourceDeleted';
export const RESOURCE_STAT_CHANGED = 'resourceStatChanged';
export const RESOURCE_SEEN_BY_USER = 'resourceSeenByUser';
export const WEATHER_DATA_FETCHED = 'weatherFetched';

// Statistical attributes
export const WATER_AMOUNT = 25;
export const STAT_MAX_WATER_LEVEL = 100;
export const STAT_XP_LEVEL = 'level';
export const STAT_WATER_LEVEL = 'waterLevel';
export const STAT_OPERATOR_SET = 'setStatEquals';
export const STAT_OPERATOR_ADD = 'incrementStat';
export const STAT_OPERATOR_SUBTRACT = 'decrementStat';

export const tileSelected = (coords) => ({
  type: TILE_SELECTED,
  coords
});

export const resourceDeleted = (id) => ({
  type: RESOURCE_DELETED,
  resourceId: id
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

// TODO: This should be an async action creator that
// retrieves treat data from an API, requiring authorization

export const treatResourceAcquired = ({
  imageThumbSrc,
  title,
  description
}) => ({
  type: RESOURCE_ACQUIRED,
  class: CLASS_TREAT,
  resource: {
    // TODO: Hardcoded for now because this will be replaced
    // by the API statement above
    rarityCode: 'rare',
    rarityDescriptor: 'Rare',
    imageThumbSrc,
    title,
    description
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

export const userSawResources = (resourceIds) => ({
  type: RESOURCE_SEEN_BY_USER,
  resourceIds
});

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
