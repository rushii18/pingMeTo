import React, { useEffect, useState } from "react";
import "./adduser.css";
import AvatarIcon from "../image/avatar.png";
import CheckIcon from "../image/chek.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  getAllGroup,
  //getAllgrousbyUser,
  groupSearch,
  userAddgrouup,
  userSearch,
} from "../Redux/groupmessage/groupAction";
import store from "../store";

const adduser = () => {
  const [groupName, setGroupName] = useState("");
  const [user, setUser] = useState("");
  const dispath = useDispatch();
  const [groupid, setGroupid] = useState();
  const [userid, setuserid] = useState();

  const { group, auth } = useSelector((store) => store);

  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   dispath(getAllgrousbyUser(token));
  // }, [group.groupChats]);

  const handleInputChange = () => {
    const group = {
      groupName: groupName,
    };

    dispath(createGroup(group));
  };

  const handleGroup = (e) => {
    setGroupName(e.target.value.trim());
    dispath(getAllGroup(groupName));
  };

  const handleSearchGroup = (e) => {
    setUser(e.target.value.trim());
    dispath(userSearch(user));
  };
  const handleUser = () => {
    dispath(userSearch(user));
  };

  const handleAdduser = (items) => {
    console.log("clikinf ", items);
    const data = {
      groupid: groupid.id,
      userid: items.id,
    };
    dispath(userAddgrouup(data));
  };

  console.log(groupid, userid);
  return (
    <div className="adduser">
      <form action="">
        <div className="gp">
          <input
            type="text"
            value={groupName}
            onChange={handleGroup}
            placeholder="Enter group name"
          />
        </div>

        {groupName &&
          group.groupchats.map((items) => (
            <div className="user">
              <div className="details">
                <img src={AvatarIcon} alt="" />
                <span>@{items.groupName}</span>
                <button type="button" onClick={() => setGroupid(items)}>
                  Select
                </button>
              </div>
            </div>
          ))}
        <div className="gp">
          <button type="button" onClick={handleInputChange}>
            <img src={CheckIcon} alt="" />
          </button>
        </div>
      </form>
      <form action="">
        <input
          type="text"
          placeholder="FindUser"
          value={user}
          onChange={handleSearchGroup}
        />
        <button type="button" onClick={handleUser}>
          Search
        </button>
      </form>
      {user &&
        group.userSearch.map((items) => (
          <div className="user">
            <div className="details">
              <img src={AvatarIcon} alt="" />
              <span>@{items.firstName}</span>
              <button onClick={() => handleAdduser(items)}>Add User</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default adduser;
