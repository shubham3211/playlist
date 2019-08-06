import {PLAYLIST_FORM} from '../constants';

const playlistForm = (state={}, action) => {
  switch(action.type) {
    case PLAYLIST_FORM:
      return action.payload
    default:
      return state
  }
}

export default playlistForm;