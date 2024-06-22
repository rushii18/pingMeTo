import React from "react";
import "./list.css";
import UserDetails from "../userDetails/UserDetails";
import ChatList from "../chatlist/ChatList";
const List = ({
  active,
  setActive,
  auth,
  messageChat,
  setmessageChat,
  activeGroup,
  setActiveGroup,
  userChat,
  setUserChat,
  setMsg,
  msg,
}) => {
  return (
    <div className="list">
      <UserDetails auth={auth} />
      <ChatList
        active={active}
        setActive={setActive}
        auth={auth}
        userChat={userChat}
        setUserChat={setUserChat}
        messageChat={messageChat}
        setmessageChat={setmessageChat}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        msg={msg}
        setMsg={setMsg}
      />
    </div>
  );
};

export default List;
