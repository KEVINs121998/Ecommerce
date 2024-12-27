// src/actions/authActions.js
import { loginUser, logoutUser } from "../features/auth/authSlice"; // Import from the slice

// Login action - dispatches loginUser action from the slice
export const loginUserAction = (token) => {
  return (dispatch) => {
    dispatch(loginUser(token)); // Dispatch the login action with the token
  };
};

// Logout action - dispatches logoutUser action from the slice
export const logoutUserAction = () => {
  return (dispatch) => {
    dispatch(logoutUser()); // Dispatch the logout action
  };
};
