import { combineReducers } from 'redux';
import gameItems from './gameItemsReducer';
import currentTile from './currentTileReducer';
import resources from './resourceReducer';

export default combineReducers({
  gameItems,
  currentTile,
  resources
});
