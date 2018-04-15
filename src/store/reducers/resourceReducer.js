import uniqid from 'uniqid';
import clone from 'clone';
import {
  CLASS_PLANT,
  RESOURCE_ACQUIRED,
  WEATHER_DATA_FETCHED
} from '../actions';
import { serializeGameObjectLocation } from '../gameDataUtils';

const initialState = {
  byId: {},
  byClass: {},
  byPosition: {},
  allIds: []
};

const initialAttributes = {
  [CLASS_PLANT]: {
    waterLevel: 0
  }
};

export default function resourceReducer(
  state = initialState,
  action = {}
) {
  let newState = clone(state);
  const actionCopy = clone(action);

  switch (action.type) {
    case RESOURCE_ACQUIRED:
      const id = uniqid();
      newState.byId[id] = Object.assign(
        actionCopy.resource,
        initialAttributes[actionCopy.class]
      );

      newState.allIds.push(id);

      newState.byClass[actionCopy.class] = newState.byClass[actionCopy.class] || [];
      newState.byClass[actionCopy.class].push(id);

      const mapLocationKey = serializeGameObjectLocation(actionCopy.selectedCoords);
      newState.byPosition[mapLocationKey] = newState.byPosition[mapLocationKey] || [];
      newState.byPosition[mapLocationKey].push(id);

    break;
    case WEATHER_DATA_FETCHED:

    break;
    default:
    break;
  }

  return newState;
}
