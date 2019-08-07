import {CREATE_PLAYLIST} from '../constants';
import {DELETE_SONG} from '../constants'

const createPlaylist = (state = [], action) => {
  switch(action.type){
    case CREATE_PLAYLIST: 
      return action.payload
    case DELETE_SONG:
      return [...state].filter((ele, id) => id!=action.payload.id);  
    default:
      return state;
  }
} 

export default createPlaylist;