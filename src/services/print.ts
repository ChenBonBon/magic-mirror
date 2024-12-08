import axios from "axios";
import { HTTPResponse } from "../models/http";
import { PrintRes } from "../models/print";

export async function print(imgUrl: string) {
  const res = await axios.get<HTTPResponse<PrintRes>>(
    "/print/api/v1/image-print?imgUrl=" + imgUrl
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
