import axios from "axios";
import { useToast } from "vue-toast-notification";

const PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL;
const HOST = import.meta.env.VITE_BACKEND_HOST;
const PORT = import.meta.env.VITE_BACKEND_PORT;

let baseURL = `${PROTOCOL}://${HOST}`;

if (PORT) {
  baseURL += `:${PORT}`;
}

const $toast = useToast();

const http = axios.create({
  baseURL,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  const sessionId = window.localStorage.getItem("sessionId");

  if (sessionId) {
    config.headers["X-Session-ID"] = sessionId;
  }

  return config;
});

http.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.success) {
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
