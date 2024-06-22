import React from "react";
import "./group.css";
import AvatarIcon from "../image/avatar.png";

const GroupCard = ({ items, activeGroup, setActiveGroup, setActive }) => {
  return (
    <div
      onClick={() => {
        setActiveGroup(items);
        setActive("");
      }}
    >
      <div className="item">
        <img src={AvatarIcon} type="file" alt="" />
        <div className="text">
          <span>{items.groupName}</span>
          <p>{items.timeStamp}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
