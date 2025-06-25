import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export const request = axios.create({
  baseURL: "/api/v1",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

request.interceptors.request.use((config) => {
  const sessionId = window.localStorage.getItem("magic-mirror-session");

  if (sessionId) {
    config.headers["X-Session-ID"] = sessionId;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    }

    $toast.error(response.data.message);
  },
  (error) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          message = "用户身份过期，请重新登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        default:
          message = "系统异常，请稍后再试！";
      }
    }

    $toast.error(message);
  }
);
