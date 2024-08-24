import axios from "axios";
import { store } from "../store/store";

axios.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    console.log(auth);
    const { token } = auth;
    if (!(config.url?.includes("login") || config.url?.includes("register"))) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
