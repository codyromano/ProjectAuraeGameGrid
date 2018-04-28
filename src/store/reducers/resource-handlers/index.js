import {
  CLASS_PLANT,
  CLASS_CURRENCY
} from 'aurae-resource-classes';
// import { STAT_WATER_LEVEL } from 'aurae-actions';
import { serializeGameObjectLocation } from '../../gameDataUtils';

// Apply logic specific to each resource class
const resourceHandlers = {
  [CLASS_PLANT]: (id) => (state, action) => {
    const mapLocationKey = serializeGameObjectLocation(action.selectedCoords);
    state.byPosition[mapLocationKey] = state.byPosition[mapLocationKey] || [];

    if (!state.byId[id].mapLocation) {
      state.byId[id].mapLocation = action.selectedCoords;
      state.byPosition[mapLocationKey].push(id);
    }

    return state;
  },

  [CLASS_CURRENCY]: (id) => (state, action) => {
    state.byId[id].amount += action.resource.addAmount;
    return state;
  }
};

export const resourceHandlerFactory = (resourceClass, ...params) => {
  return resourceHandlers[resourceClass](...params);
};
