import { TILE_SELECTED, PLACE_RESOURCE_CONFIRMED } from '../actions';
import { serializeGameObjectLocation } from '../gameDataUtils';

const initialState = {
  coords: [-1, -1],
  tileInnerContentMap: {}
};

const tileSelectedReducer = (
  state = initialState,
  action = {}
) => {
  const newState = { ...state };
  switch (action.type) {
    case TILE_SELECTED:
      newState.coords = action.coords;
      break;
    
    case PLACE_RESOURCE_CONFIRMED:
      const [x, y] = newState.coords;
      const contentKey = serializeGameObjectLocation(x, y);
      newState.tileInnerContentMap[contentKey] = action.resource;
    break;
  }
  return newState;
};

export default tileSelectedReducer;
