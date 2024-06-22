import { SEARCH_USER_REQUEST } from "../authActiontype";
import { userSearch } from "./groupAction";
import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCSEE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  GET_ALL_GROUP_MESSAGE_SUCCESS,
  GET_ALL_GROUP_SUCCESS,
  GET_GROUP_SUCCESS,
  SEARCH_USER_SUCCESS_GROUP,
} from "./groupActiontype";

const initialState = {
  groupMessages: [],
  groupchats: [],
  loading: false,
  error: null,
  message: null,
  groupUserlist: [],
  userSearch: [],
  groupobj: null,
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groupchats: [action.payload, ...state.groupchats],
      };
    case ADD_USER_REQUEST:
      return { ...state, loading: false, groupUserlist: action.payload };

    case GET_ALL_GROUP_SUCCESS:
      return {
        ...state,
        groupchats: action.payload,
        loading: false,
      };
    case GET_ALL_GROUP_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        groupMessages: action.payload,
      };
    case ADD_USER_SUCCSEE:
      return {
        ...state,
        loading: false,
        groupUserlist: action.payload,
      };
    case SEARCH_USER_SUCCESS_GROUP:
      return {
        ...state,
        loading: false,
        userSearch: action.payload,
      };

    default:
      return state;
  }
};
