import { SET_USER } from "./action_types"

const initialState = {
  isAuthenticated: false,
  currentUser: null
}

function reducer(state = initialState, action){
  if( action.type === SET_USER ){
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
      currentUser: action.payload.currentUser
    }
  }
  return state;
}

export default reducer;
