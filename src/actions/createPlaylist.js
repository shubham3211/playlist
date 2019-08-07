import {CREATE_PLAYLIST} from '../constants';
import {DELETE_SONG} from '../constants';
export const createPlaylist = (playlist) => {
  return {
    type: CREATE_PLAYLIST,
    payload: playlist
  }
}

export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    payload: id
  }
}

export default createPlaylist;