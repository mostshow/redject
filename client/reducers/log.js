
import { GETLOG } from '../actions/types';

const initialState = []

export default (state = initialState, action = {}) => {
  switch(action.type) {


    case GETLOG :
      return [...action.logList]

    default: return state;
  }
}

