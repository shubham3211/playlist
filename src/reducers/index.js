import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import addFeaturedPlaylist from './featuredPlaylist'
import selectedSong from './selectedSong'
import playlistCreated from './createPlaylist';
import showModal from './modalReducer'

export default combineReducers ({
  featuredPlaylist: addFeaturedPlaylist,
  selectedSong,
  playlistCreated,
  form: formReducer,
  showModal
})