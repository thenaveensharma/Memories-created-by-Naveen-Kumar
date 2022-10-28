import * as api from "../api";
//action types importing

import { AUTH } from "../constants/actionTypes";

// Action Creator

export const signin = (formData, history) => async (dispatch) => {
  try {
    //signin user
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    console.log(history)
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    //signup user
    console.log('creating user singup')
    const { data } = await api.signUp(formData);
    console.log('created user')
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error + 'in signUp');
  }
};
