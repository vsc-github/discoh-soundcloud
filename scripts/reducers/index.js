import { combineReducers } from 'redux';
import entities from '../reducers/entities';
import environment from '../reducers/environment';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';

const rootReducer = combineReducers({
  entities,
  environment,
  navigator,
  player,
  playlists,
});

export default rootReducer;
