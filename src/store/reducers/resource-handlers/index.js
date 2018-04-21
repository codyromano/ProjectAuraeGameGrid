import {
  CLASS_PLANT,
  CLASS_CURRENCY
} from 'aurae-resource-classes';
import { serializeGameObjectLocation } from '../../gameDataUtils';

const initialAttributes = {
  [CLASS_PLANT]: {
    waterLevel: 0
  },
  [CLASS_CURRENCY]: {}
};

// Apply logic specific to each resource class
const resourceHandlers = {
  [CLASS_PLANT]: (id) => (state, action) => {
    Object.assign(action, initialAttributes[CLASS_PLANT]);

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
