import type { Payment } from "../models/payment";
import { request } from "../request";

export async function getPaymentUrl() {
  const res = await request.post<Payment>("/payUrl");

  return res;
}

export async function getPaymentStatus(billNo: string) {
  const res = await request.get("/getStatus", {
    params: {
      billNo,
    },
  });

  return res;
}
