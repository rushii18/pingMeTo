import Login from "./All/componants/login/Login";
import Home from "./All/componants/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./All/componants/register/Register";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={auth.user ? <Navigate to="/home" /> : <Login />}
            />
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
