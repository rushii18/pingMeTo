import Login from "./All/componants/login/Login";
import Home from "./All/componants/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./All/componants/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { getUserdata } from "./All/componants/Redux/authAction";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  //console.log(auth, "auth");

  useEffect(() => {
    dispatch(getUserdata(token));
  }, [token]);
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} /> */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={auth.user ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
