import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pingme-ffe2a.firebaseapp.com",
  projectId: "pingme-ffe2a",
  storageBucket: "pingme-ffe2a.appspot.com",
  messagingSenderId: "640212602050",
  appId: "1:640212602050:web:752e635b0d05fabd963f5b",
};

const app = initializeApp(firebaseConfig);
