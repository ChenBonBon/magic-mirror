import http from "../http";
import { HTTPResponse } from "../models/http";
import { CreateOrderRes } from "../models/order";
import { WorkflowType } from "../models/session";

export async function createOrder(
  workflowType: WorkflowType,
  imageUrl: string
) {
  const res = await http.post<HTTPResponse<CreateOrderRes>>("/payment/create", {
    workflowType,
    imageUrl,
  });

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
