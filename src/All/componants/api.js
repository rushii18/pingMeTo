import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = "https://localhost:5151";
//export const API_BASE_URL = "https://77f5-115-96-77-182.ngrok-free.app";

const token = localStorage.getItem("token");

// const getTokenFromCookie = () => {
//   return Cookies.get("token");
// };
// const token = getTokenFromCookie;
// console.log(getTokenFromCookie);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
