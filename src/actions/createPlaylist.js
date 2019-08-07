import {CREATE_PLAYLIST} from '../constants';
import {DELETE_SONG} from '../constants';
import Spotify from '../core/Spotify'

export const createPlaylist = (song) => {
  return dispatch => {
    Spotify.makePlaylist(song).then((playlist) => {
      dispatch({
        type: CREATE_PLAYLIST,
        payload: playlist
      })
    })
  }
}

export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    payload: id
  }
}

export default createPlaylist;