import React, { useEffect, useState } from "react";
import "./chatlist.css";
import AvatarIcon from "../image/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, getAllmessage } from "../Redux/message/messageAction";

const ChatCard = ({ chat, active, setActive, setActiveGroup }) => {
  const dispatch = useDispatch();
  const { auth, message } = useSelector((store) => store);

  return (
    <div>
      <div
        className="item"
        onClick={() => {
          setActiveGroup("");
          setActive(chat);
        }}
      >
        <img src={AvatarIcon} type="file" alt="" />
        <div className="text">
          <span>
            {chat &&
              chat.users &&
              chat.users.length >= 2 &&
              (auth.user?.id === chat.users[0].id
                ? chat.users[1].firstName
                : chat.users[0].firstName)}
          </span>
          <p>{chat?.timeStamp}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
