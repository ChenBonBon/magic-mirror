import http from "../http";
import { HTTPResponse } from "../models/http";
import { CreateOrderRes, GetPaymentStatusRes } from "../models/order";

export async function createOrder() {
  const res = await http.post<HTTPResponse<CreateOrderRes>>(
    "/payUrl?client_id=" +
      window.localStorage.getItem("magic-mirror-sessionId"),
    {}
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}

export async function getPaymentStatus(billNo: string) {
  const res = await http.get<HTTPResponse<GetPaymentStatusRes>>(
    "/getStatus?billNo=" + billNo
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
