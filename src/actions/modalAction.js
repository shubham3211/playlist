import {OPEN_MODAL, CLOSE_MODAL} from '../constants';

export const modalAction = (open) => {
  if(open){
    return {
      type: OPEN_MODAL,
    }
  }
  return {
    type: CLOSE_MODAL
  }
}