import uniqid from 'uniqid';
import { RESOURCE_ACQUIRED } from '../actions';
import { serializeGameObjectLocation } from '../gameDataUtils';

const initialState = {
  byId: {},
  byClass: {},
  byPosition: {},
  allIds: []
};

export default function resourceReducer(
  state = initialState,
  action = {}
) {
  let newState = {...state};

  switch (action.type) {
    case RESOURCE_ACQUIRED:
      const id = uniqid();
      newState.byId[id] = action.resource;
      newState.allIds.push(id);

      newState.byClass[action.class] = newState.byClass[action.class] || [];
      newState.byClass[action.class].push(id);

      const mapLocationKey = serializeGameObjectLocation(action.selectedCoords);
      newState.byPosition[mapLocationKey] = newState.byPosition[mapLocationKey] || [];
      newState.byPosition[mapLocationKey].push(id);
      
      // TODO: Uncomment if you need logic specific to resource class
      // Reducer logic specific to the given resource class
      // const resourceReducer = resourceAcquisitionReducers[action.class];
      // newState = resourceReducer(newState, action);
    break;
    default:
    break;
  }

  return newState;
}
