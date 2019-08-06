import {PLAYLIST_FORM} from '../constants';

export const playlistForm = (playlist) => {
  return {
    type: PLAYLIST_FORM,
    payload: playlist
  }
} 