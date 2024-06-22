import React, { useEffect, useMemo, useRef, useState } from "react";
import "../chat/chat.css";
import AvatarIcon from "../image/avatar.png";
import PhoneIcon from "../image/phone.png";
import VideoIcon from "../image/video.png";
import FileIcon from "../image/file.png";
import CameraIcon from "../image/camera.png";
import EmojiIcon from "../image/emoji.png";
import MicIcon from "../image/mic.png";
import EmojiPicker from "emoji-picker-react";
import ChatList from "../chatlist/ChatList";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import {
  createMessage,
  getAllChat,
  getAllmessage,
} from "../Redux/message/messageAction";
import { api } from "../api";
import { GET_ALL_CHAT_SUCCESS } from "../Redux/message/messageActiontype";
import { getUserdata } from "../Redux/authAction";
import {
  createGroupMessage,
  getAllGroupMessages,
} from "../Redux/groupmessage/groupAction";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Chat = ({
  active,
  setActive,
  messageChat,
  setmessageChat,
  activeGroup,
  setActiveGroup,
  userChat,
  setUserChat,
  msg,
  setMsg,
}) => {
  const [opne, setOpne] = useState(false);
  const [text, setText] = useState("");
  const [opnechat, setOpnechat] = useState(false);
  const [selectedImage, setselectedImage] = useState();
  const [loading, setLoading] = useState();

  const [groupMessage, setGroupMessage] = useState();
  const [stompClient, setStompClient] = useState();
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");
  const { message, auth, group } = useSelector((store) => store);

  const dispatch = useDispatch();
  const [chatMsg, setChatMsg] = useState([...message.messages]);

  useEffect(() => {
    setChatMsg([...message.messages]);
  }, [active, message.messages]);

  useEffect(() => {
    dispatch(getUserdata(token));
  }, [token]);

  const endref = useRef(null);
  useEffect(() => {
    endref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = (value) => {
    const messageOnetoOne = {
      textMessage: value,
      chatid: active.id,
    };

    setChatMsg(chatMsg.concat(messageOnetoOne));

    dispatch(createMessage({ messageOnetoOne, sendMessagetoServer }));
    const messageGroup = {
      textMessage: value,
      groupid: activeGroup?.id,
    };

    dispatch(
      createGroupMessage({ messageGroup, sendMessageToServerfromGroup })
    );
  };

  useEffect(() => {
    const sock = new SockJS("https://localhost:5151/ws");
    // const sock = new SockJS("https://77f5-115-96-77-182.ngrok-free.app/sw");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
    console.log(stompClient);
  }, []);
  const onError = (error) => {
    console.log(error);
  };

  const onConnect = () => {
    console.log("Websocket Connected....");
  };
  // one ON one chat
  useEffect(() => {
    if (stompClient && active && auth.user) {
      const subscription = stompClient.subscribe(
        `/user/${active?.id}/private`,
        onMessageRecived
      );
      console.log("click");
    }
  }, [active]);

  const sendMessagetoServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${active?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };
  const onMessageRecived = (payload) => {
    const data = JSON.parse(payload.body);

    setChatMsg((prev) => prev.concat(data));
    // setChatMsg([...chatMsg, data]);
    console.log(data, "RecivedMsg");
  };

  // useEffect(() => {
  //   dispatch(getAllmessage({ chatid: active?.id }));
  // }, [messages]);

  // Group chats
  useEffect(() => {
    if (stompClient && activeGroup && auth.user) {
      const subscription = stompClient.subscribe(
        `/user/${activeGroup?.id}/private`,
        onMessageRecivedTogroup
      );
      console.log("click");
    }
  }, [activeGroup]);

  const sendMessageToServerfromGroup = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/group/${activeGroup?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };
  const onMessageRecivedTogroup = (payload) => {
    const groupMsg = JSON.parse(payload.body);
    console.log("message from group ", groupMsg);
  };

  const handleSendImage = (e) => {
    // selectedImage(e.target.value);
  };

  const handlechat = () => {
    setOpnechat((prve) => !prve);
  };

  const handleEmoji = (e) => {
    setText((prve) => prve + e.emoji);
    setOpne(false);
  };

  return (
    <div className="chat">
      {active || activeGroup ? (
        <div className="chat">
          <div className="top">
            <div className="user">
              <img src={active?.img} alt="" />

              <div className="text">
                <span>
                  {active &&
                    active.users &&
                    active.users.length >= 2 &&
                    (auth.user.id === active.users[0].id
                      ? active.users[1].firstName
                      : active.users[0].firstName)}
                </span>
                {activeGroup && (
                  <div className="text">
                    <span>{activeGroup.groupName}</span>
                    <p>online</p>
                  </div>
                )}
              </div>
            </div>
            <div className="icons">
              <img src={PhoneIcon} alt="" />
              <img src={VideoIcon} alt="" />
            </div>
          </div>

          <div className="center">
            {active &&
              chatMsg.map((items) => (
                <div
                  className={`message ${
                    auth.user.id === items?.user?.id
                      ? "current-user"
                      : "other-user"
                  }`}
                >
                  <img src={items?.img} alt="" />
                  <div className="texts">
                    {items?.img}
                    <p>{items?.textMessage}</p>
                    <span>1 min ago {items?.senderUser} </span>
                    <span></span>
                  </div>
                </div>
              ))}
            {activeGroup &&
              groupMessage.map((items) => (
                <div
                  className={`message ${
                    (auth.user.id === items?.user?.id) === true
                      ? "current-user"
                      : "other-user"
                  }`}
                >
                  <img src={items?.img} alt="" />
                  <div className="texts">
                    {items?.img}
                    <p>{items.textMessage}</p>
                    <span>
                      {items?.timeStamp}

                      {items?.senderUser}
                    </span>
                  </div>
                </div>
              ))}

            <div ref={endref}></div>
          </div>
          <div className="bottom">
            <div className="icon">
              <img src={FileIcon} alt="" />
              <img src={CameraIcon} alt="" />
              <img src={MicIcon} alt="" />
            </div>

            <input
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter" && text) {
                  handleSendMessage(text);
                }
              }}
              type="text"
              placeholder="typingmsg"
              onChange={(e) => setText(e.target.value)}
            />
            <div className="emoji">
              <img
                src={EmojiIcon}
                alt=""
                onClick={() => setOpne((prve) => !prve)}
              />
              <div className="picker">
                <EmojiPicker open={opne} onEmojiClick={handleEmoji} />
              </div>
            </div>
            <button type="button">Send</button>
          </div>
        </div>
      ) : (
        <div>Nothing!!!</div>
      )}
    </div>
  );
};

export default Chat;
