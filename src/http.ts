import axios from "axios";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const http = axios.create({
  baseURL: "/api/v1",
  timeout: 180000,
});

http.interceptors.request.use((config) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  const sessionId = window.localStorage.getItem("magic-mirror-sessionId");

  if (sessionId) {
    config.headers["X-Session-ID"] = sessionId;
  }

  return config;
});

http.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.code === 200) {
      return response;
    }

    $toast.error(response.data.message, {
      position: "top",
    });

    return response;
  } else {
    $toast.error("系统异常", {
      position: "top",
    });

    return response;
  }
});

export default http;
