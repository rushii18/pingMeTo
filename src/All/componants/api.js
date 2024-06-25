import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = "http://localhost:5151";
//export const API_BASE_URL = "https://8b14-115-96-216-99.ngrok-free.app";

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
