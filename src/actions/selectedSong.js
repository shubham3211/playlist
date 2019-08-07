import {SELECTED_SONG} from '../constants';

const selectedSong = (song) => {
  return {
    type: SELECTED_SONG,
    payload: song
  }
}

export default selectedSong;