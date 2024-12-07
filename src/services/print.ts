import http from "../http";
import { HTTPResponse } from "../models/http";
import { PrintRes } from "../models/print";

export async function print(imgUrl: string) {
  const res = await http.get<HTTPResponse<PrintRes>>(
    "/image-print?imgUrl=" + imgUrl
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
