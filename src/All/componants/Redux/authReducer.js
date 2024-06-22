import { act } from "react-dom/test-utils";
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
  SEARCH_USER_SUCCESS,
} from "./authActiontype";

const initialState = {
  user: null,
  jwt: null,
  error: null,
  Lodding: false,
  searchUser: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
      return { ...state, Lodding: true, error: null };
    case GET_PROFILE_SUCCESS:
      return { ...state, Lodding: false, user: action.payload, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        Lodding: false,
        error: null,
        jwt: action.payload,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        Lodding: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
      return { ...state, Lodding: false, error: action.payload };
    default:
      return state;
  }
};
