import React, { useEffect } from "react";
import "./details.css";
import AvatarIcon from "../image/avatar.png";
import ChatSetting from "../image/chatsetting.png";
import DownLoadIcon from "../image/download.png";
import ArrowDownIcon from "../image/arrowdown.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserdata } from "../Redux/authAction";
import { Link } from "react-router-dom";

const Details = ({ auth }) => {
  // const dispatch = useDispatch();
  // const token = localStorage.getItem("token");
  // const { auth } = useSelector((store) => store);

  // useEffect(() => {
  //   dispatch(getUserdata(token));
  // }, [token]);
  return (
    <div className="details">
      <div className="user">
        <img src={AvatarIcon} alt="" />
        <h2>@{auth.user?.firstName}</h2>
        <p>I am creating my own sunshine</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="titel">
            <span>Chat Setting</span>
            <img src={ArrowDownIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Privacy & help</span>
            <img src={ArrowDownIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Shared photos</span>
            <img src={ArrowDownIcon} alt="" />
          </div>
          <div className="photos">
            <div className="photoitems">
              <div className="photosdetails">
                <img
                  src="https://i.pinimg.com/236x/31/54/1a/31541afb0cab2c4597ff54841d6288a1.jpg"
                  alt=""
                />
                <span>image.png</span>
              </div>
              <img src={DownLoadIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Shared files</span>
            <img src={ArrowDownIcon} alt="" />
          </div>
        </div>
        <button className="blockuser">Block User</button>
        <Link to="/login">
          <button className="logout">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Details;
