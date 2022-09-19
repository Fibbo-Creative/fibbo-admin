export const initialState = {
  userProfile: {},
  balance: 0,
  correctChain: true,
  auth: false,
};

export const actionTypes = {
  LOGIN_USER: "SET_USER_PROFILE",
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        auth: true,
      };

    default:
      return state;
  }
};

export default stateReducer;
