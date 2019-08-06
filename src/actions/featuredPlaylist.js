import {ADD_FEATURED_PLAYLIST} from '../constants';

export const addFeaturedPlaylist = (playlists) => {
  return {
    type: ADD_FEATURED_PLAYLIST,
    payload: playlists
  }
}