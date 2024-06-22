import React, { useEffect, useState } from "react";
import List from "../list/List";
import Chat from "../chat/Chat";
import Details from "../details/Details";
import { useDispatch, useSelector } from "react-redux";
import { getUserdata } from "../Redux/authAction";

const Home = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [active, setActive] = useState(); // chat
  const token = localStorage.getItem("token");
  const [activeGroup, setActiveGroup] = useState(); // group
  const [messageChat, setmessageChat] = useState([]);
  const [userChat, setUserChat] = useState();
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    dispatch(getUserdata(token));
  }, [token]);

  return (
    <div className="container">
      <List
        auth={auth}
        active={active}
        setActive={setActive}
        messageChat={messageChat}
        setmessageChat={setmessageChat}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        userChat={userChat}
        setUserChat={setUserChat}
        msg={msg}
        setMsg={setMsg}
      />
      <Chat
        active={active}
        setActive={setActive}
        messageChat={messageChat}
        setmessageChat={setmessageChat}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        userChat={userChat}
        setUserChat={setUserChat}
        msg={msg}
        setMsg={setMsg}
      />
      <Details auth={auth} />
    </div>
  );
};

export default Home;
