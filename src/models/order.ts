type PaymentStatus = "success" | "waiting";

export interface CreateOrderRes {
  QRCode: string;
  billNo: string;
}

export interface GetPaymentStatusRes {
  status: PaymentStatus;
}
