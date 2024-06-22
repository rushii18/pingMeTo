import React, { useEffect, useState } from "react";
import "./chatlist.css";
import SearchIcon from "../image/search.png";
import PlusIcon from "../image/plus.png";
import MinuseIcon from "../image/minuse.png";
import AvatarIcon from "../image/avatar.png";
import Adduser from "../adduser/Adduser.jsx";
import Chat from "../chat/Chat.jsx";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers, searchUsersbyname } from "../Redux/authAction.js";
import {
  createChat,
  getAllChat,
  getAllmessage,
} from "../Redux/message/messageAction.js";
import ChatCard from "./ChatCard.jsx";
import GroupCard from "../grouplist/GroupCard.jsx";
import {
  getAllGroupMessages,
  getAllgrousbyUser,
} from "../Redux/groupmessage/groupAction.js";

const ChatList = ({
  active,
  setActive,
  messageChat,
  setmessageChat,
  activeGroup,
  setActiveGroup,
  userChat,
  setUserChat,
  setMsg,
  msg,
}) => {
  const { auth, message, group } = useSelector((store) => store);
  const [addMode, setaddMode] = useState(false);
  const [userName, setUserName] = useState(" ");

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(
    () => {
      dispatch(getAllChat());
      dispatch(getAllgrousbyUser(token));
    },
    [message.chats.length],
    [token]
  );

  const handleSearchuser = (e) => {
    setUserName(e.target.value.trim());
    dispatch(searchUsers(userName));
  };
  const handleSearch = () => {
    dispatch(searchUsers(userName));
  };

  const handleMessage = (item) => {
    dispatch(getAllmessage({ chatid: item.id }));
    setMsg(item.message);
  };

  const handleGroupMessage = (id) => {
    dispatch(getAllGroupMessages({ groupid: id }));
  };

  const handelAddChat = (firstName) => {
    setUserChat(firstName);
    dispatch(createChat({ firstName: firstName }));
  };

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchbar">
          <form action="">
            <input
              placeholder="Search"
              onChange={handleSearchuser}
              type="text"
              value={userName}
            />
            <button type="button" onClick={handleSearch}>
              <img src={SearchIcon} alt="" />
            </button>
          </form>
        </div>
        <img
          src={addMode ? MinuseIcon : PlusIcon}
          className="add"
          alt=""
          onClick={() => setaddMode((prev) => !prev)}
        />
      </div>
      {userName &&
        auth.searchUser.map((items) => (
          <div className="item" onClick={() => setActive(items)}>
            <img src={AvatarIcon} type="file" alt="" />
            <div className="text">
              <span>{items.firstName + " " + items.lastName}</span>
              <p>{items.lastMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => handelAddChat(items.firstName)}
            >
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        ))}

      {message.chats &&
        message.chats.map((item) => (
          <div onClick={() => handleMessage(item)}>
            <ChatCard
              chat={item}
              messageChat={messageChat}
              setmessageChat={setmessageChat}
              active={active}
              setActiveGroup={setActiveGroup}
              setActive={setActive}
            />
          </div>
        ))}

      {group.groupchats &&
        group.groupchats.map((items) => (
          <div onClick={() => handleGroupMessage(items.id)}>
            <GroupCard
              items={items}
              activeGroup={activeGroup}
              setActive={setActive}
              setActiveGroup={setActiveGroup}
            />
          </div>
        ))}

      {addMode && <Adduser />}
    </div>
  );
};

export default ChatList;
