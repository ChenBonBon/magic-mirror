import { request } from "../request";

export async function getSessionId() {
  const res = await request.get("/session/init");

  return res;
}
