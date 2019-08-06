import {CREATE_PLAYLIST} from '../constants';

const createPlaylist = (playlist) => {
  return {
    type: CREATE_PLAYLIST,
    payload: playlist
  }
}

export default createPlaylist;