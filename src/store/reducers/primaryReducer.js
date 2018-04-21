import { combineReducers } from 'redux';
import gameItems from 'aurae-reducers/gameItemsReducer';
import currentTile from 'aurae-reducers/currentTileReducer';
import resources from 'aurae-reducers/resourceReducer';
import weather from 'aurae-reducers/weatherReducer';

export default combineReducers({
  gameItems,
  currentTile,
  resources,
  weather
});
