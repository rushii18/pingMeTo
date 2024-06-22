import React, { useEffect, useState } from "react";
import "./userdetails.css";
import MoreIcon from "../image/more.png";
import VideoIcon from "../image/video.png";
import EditIcon from "../image/edit.png";
import AvatarIcon from "../image/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserdata } from "../Redux/authAction";
import UserProfileForm from "../profile/UserProfileForm";

const UserDetails = () => {
  const [profie, setProfile] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserdata(token));
  }, [token]);

  const setProinfo = () => {
    console.log("profiel set ");
  };

  return (
    <div className="userdetails">
      <div className="user">
        <img className="" src={AvatarIcon} alt="" />

        <h4>{auth.user?.firstName + " " + auth.user?.lastName}</h4>
      </div>
      <div className="icon">
        <img
          src={EditIcon}
          alt=""
          onClick={() => setProfile((prve) => !prve, console.log(profie))}
        />
      </div>
      {profie && UserProfileForm}
    </div>
  );
};

export default UserDetails;
