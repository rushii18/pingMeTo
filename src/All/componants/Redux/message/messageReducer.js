import {
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_SUCCESS,
  GET_ALL_MESSAGE_SUCCESS,
} from "./messageActiontype";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};
export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return { ...state, message: action.paylod };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [action.paylod, ...state.chats],
        error: null,
      };
    case GET_ALL_CHAT_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
