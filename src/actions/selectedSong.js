import {SELECTED_SONG} from '../constants';

export const selectedSong = (song) => {
  return {
    type: SELECTED_SONG,
    payload: song
  }
}