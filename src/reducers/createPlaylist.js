import {CREATE_PLAYLIST} from '../constants';

const createPlaylist = (state = [], action) => {
  switch(action.type){
    case CREATE_PLAYLIST: 
      return action.payload
    default:
      return state;
  }
}

export default createPlaylist;