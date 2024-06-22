import React from "react";
import "./notification.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
const Notification = () => {
  return (
    <div className="">
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Notification;
