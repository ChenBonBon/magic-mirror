import http from "../http";
import { HTTPResponse } from "../models/http";

export async function getSessionId(workflowType: "cute" | "aiPhoto") {
  const res = await http.get<HTTPResponse<string>>(
    "/api/getClientId?workflowType=" + workflowType
  );

  if (res.data && res.data.success) {
    window.localStorage.setItem("sessionId", res.data.data);
  }
}
