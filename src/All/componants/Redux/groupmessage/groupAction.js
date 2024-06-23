import { api, API_BASE_URL } from "../../api";
import {
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
} from "../authActiontype";
import { CREATE_MESSAGE_ERROR } from "../message/messageActiontype";
import {
  ADD_USER_FAILD,
  ADD_USER_REQUEST,
  ADD_USER_SUCCSEE,
  CREATE_GROUP_MESSAGE_ERROR,
  CREATE_GROUP_MESSAGE_REQUEST,
  CREATE_GROUP_MESSAGE_SUCCESS,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  GET_ALL_GROUP_FAILD,
  GET_ALL_GROUP_MESSAGE_FAILD,
  GET_All_GROUP_MESSAGE_REQUEST,
  GET_ALL_GROUP_MESSAGE_SUCCESS,
  GET_ALL_GROUP_REQUEST,
  GET_ALL_GROUP_SUCCESS,
  GET_GROUP_FAILD,
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  SEARCH_USER_REQUEST_FAILD,
  SEARCH_USER_REQUEST_GROUP,
  SEARCH_USER_SUCCESS_GROUP,
} from "./groupActiontype";

export const createGroup = (group) => async (dispatch) => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  try {
    const { data } = await api.post(`/api/newgroup`, group);
    console.log(data);
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_MESSAGE_ERROR, payload: error });
    console.log(error);
  }
};

export const createGroupMessage = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_GROUP_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/groupmesage`, reqData.messageGroup);
    console.log(data);
    reqData.sendMessageToServerfromGroup(data);
    dispatch({
      type: CREATE_GROUP_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CREATE_GROUP_MESSAGE_ERROR, payload: error });
    console.log(error);
  }
};

export const getAllGroupMessages =
  ({ groupid }) =>
  async (dispatch) => {
    dispatch({ type: GET_All_GROUP_MESSAGE_REQUEST });
    try {
      const { data } = await api.get(`/api/getAllgroupmessage/${groupid}`);
      console.log(data);

      dispatch({ type: GET_ALL_GROUP_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_GROUP_MESSAGE_FAILD, payload: error });
      console.log(error);
    }
  };

export const userAddgrouup = (groupRequest) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  try {
    const { data } = await api.post(`/api/useraddgroup`, groupRequest);
    console.log(data);
    dispatch({ type: ADD_USER_SUCCSEE, payload: data });
  } catch (error) {
    dispatch({ type: ADD_USER_FAILD, payload: error });
    console.log(error);
  }
};

export const getAllGroup = (query) => async (dispatch) => {
  dispatch({ type: GET_ALL_GROUP_REQUEST });
  try {
    const { data } = await api.get(`/api/getgroups?query=${query}`);
    console.log(data);
    dispatch({ type: GET_ALL_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_GROUP_FAILD, payload: error });
    console.log(error);
  }
};

export const userSearch = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST_GROUP });
  try {
    const { data } = await api.get(
      `${API_BASE_URL}/api/getalluser?query=${query}`
    );
    console.log("search", data);
    dispatch({ type: SEARCH_USER_SUCCESS_GROUP, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: SEARCH_USER_REQUEST_FAILD, payload: error });
  }
};

export const getAllgrousbyUser = (token) => async (dispatch) => {
  dispatch({ type: GET_ALL_GROUP_REQUEST });
  try {
    const { data } = await api.get(`/api/getgroupbyuser`, token);
    console.log("search", data);
    dispatch({ type: GET_ALL_GROUP_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_GROUP_FAILD, payload: error });
  }
};

export const groupSearch = (groupName) => async (dispatch) => {
  dispatch({ type: GET_GROUP_REQUEST });
  try {
    const { data } = await api.get(`/api/group/${groupName.groupName}`);
    console.log("search", data);
    dispatch({ type: GET_GROUP_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_GROUP_FAILD, payload: error });
  }
};
