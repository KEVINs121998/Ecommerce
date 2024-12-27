const initialState = {
  token: null,  // This stores the token in Redux state
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload,  // Update the token when user logs in
      };
    case "LOGOUT_USER":
      return {
        ...state,
        token: null,  // Reset token when user logs out
      };
    default:
      return state;
  }
};

export default authReducer;
