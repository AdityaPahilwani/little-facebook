import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  userId: null,
  name:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:

      return {
        userId: action.userId,
        name:action.name
      };
    case LOGOUT:
      return initialState;
   
    default:
      return state;
  }
};
