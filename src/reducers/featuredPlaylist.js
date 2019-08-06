import {ADD_FEATURED_PLAYLIST} from '../constants'

const addFeaturedPlaylist = (state = [], action) => {
  switch(action.type) {
    case ADD_FEATURED_PLAYLIST: 
      return [...state, ...action.payload];
    default:
      return state
  }
}

export default addFeaturedPlaylist;
