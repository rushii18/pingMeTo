import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./Redux/authReducer";
import { thunk } from "redux-thunk";
import { messageReducer } from "./Redux/message/messageReducer";
import { groupReducer } from "./Redux/groupmessage/groupReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  group: groupReducer,
});

const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
export default store;
