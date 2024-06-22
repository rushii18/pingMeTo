import axios from "axios";
import Cookies from "js-cookie";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
} from "./authActiontype";
import { api, API_BASE_URL } from "../api";

export const loginUserAction = (logingData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/signin`,
      logingData.data
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("token", data.token);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const resisterUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/signup`,
      registerData.data
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("token", data.token);
    }
    console.log(data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getUserdata = (token) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await api.get(`/api/getuserjwt`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const searchUsers = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(
      `${API_BASE_URL}/api/getalluser?query=${query}`
    );
    console.log("search", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};

export const searchUsersbyname = (user) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/getusername`, user);
    console.log("search", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};
