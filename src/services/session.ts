import http from "../http";
import { HTTPResponse } from "../models/http";
import { GetSessionIdRes, WorkflowType } from "../models/session";

export async function getSessionId(workflowType: WorkflowType) {
  const res = await http.get<HTTPResponse<GetSessionIdRes>>(
    "/session/init?workflowType=" + workflowType
  );

  if (res.data && res.data.code === 200) {
    const { sessionId } = res.data.data;

    window.localStorage.setItem("magic-mirror-sessionId", sessionId);
  }
}
