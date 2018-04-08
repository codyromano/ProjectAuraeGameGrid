import { combineReducers } from 'redux';
import gameItems from './gameItemsReducer';
import currentTile from './currentTileReducer';
import resources from './resourceReducer';
import weather from './weatherReducer';

export default combineReducers({
  gameItems,
  currentTile,
  resources,
  weather
});
