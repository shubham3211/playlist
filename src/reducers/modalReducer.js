import {CLOSE_MODAL, OPEN_MODAL} from '../constants';

const modalAction = (state=false, action) => {
  switch(action.type) {
    case OPEN_MODAL: 
      return true
    case CLOSE_MODAL:
      return false
    default:
      return false
  }
}

export default modalAction;