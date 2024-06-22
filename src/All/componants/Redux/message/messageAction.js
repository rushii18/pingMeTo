import { api } from "../../api";
import {
  CREATE_CHAT_ERROR,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_FAILD,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
  GET_ALL_MESSAGE_FAILD,
  GET_ALL_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_SUCCESS,
} from "./messageActiontype";

export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(
      `/api/cretemessage`,
      reqData.messageOnetoOne
    );
    console.log(data);
    reqData.sendMessagetoServer(data);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_MESSAGE_ERROR, payload: error });
    console.log(error);
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post(`/api/chat/create`, chat);
    console.log(data);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CHAT_ERROR, payload: error });
    console.log(error);
  }
};

export const getAllChat = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHAT_REQUEST });
  try {
    const { data } = await api.get(`/api/getallchat`);
    console.log(data, "data");
    dispatch({ type: GET_ALL_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_CHAT_FAILD, payload: error });
    console.log(error);
  }
};

export const getAllmessage =
  ({ chatid }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_MESSAGE_REQUEST });
    try {
      const { data } = await api.get(`/api/getAllmessage/${chatid}`);
      console.log(data, "messges");
      dispatch({ type: GET_ALL_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_MESSAGE_FAILD, payload: error });
      console.log(error);
    }
  };
