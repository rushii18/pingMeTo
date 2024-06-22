import React, { useState } from "react";

const AddUserToGroup = () => {
  const [group, setgroup] = useState("");

  const handelCreteGroup = () => {
    //setgroup();
    console.log("handle group");
  };

  return (
    <div className="groupuser">
      <form action="">
        <p>Create Group</p>
        <input type="text" placeholder="GroupName" />
        <input type="text" name="" id="" placeholder="FindUser" />

        <button onClick={() => handelCreteGroup()}>Search</button>
      </form>
      <div className="user">
        <div className="details">
          <img src={AvatarIcon} alt="" />
          <span>Athi gulave</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUserToGroup;
