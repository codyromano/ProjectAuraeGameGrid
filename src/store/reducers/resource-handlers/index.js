import {
  CLASS_PLANT,
  CLASS_CURRENCY
} from 'aurae-resource-classes';
import { STAT_WATER_LEVEL, STAT_XP_LEVEL } from 'aurae-actions';
import { serializeGameObjectLocation } from '../../gameDataUtils';

const initialAttributes = {
  [CLASS_PLANT]: {
    stats: {
      [STAT_WATER_LEVEL]: 0,
      [STAT_XP_LEVEL]: 1
    }
  },
  [CLASS_CURRENCY]: {}
};

// Apply logic specific to each resource class
const resourceHandlers = {
  [CLASS_PLANT]: (id) => (state, action) => {
    Object.assign(state.byId[id], initialAttributes[CLASS_PLANT]);

    const mapLocationKey = serializeGameObjectLocation(action.selectedCoords);
    state.byPosition[mapLocationKey] = state.byPosition[mapLocationKey] || [];
    state.byPosition[mapLocationKey].push(id);

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
