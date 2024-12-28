type PaymentStatus = "success" | "waiting";

export interface CreateOrderRes {
  QRCode: string;
  billNo: string;
  skip: boolean;
}

export interface GetPaymentStatusRes {
  status: PaymentStatus;
}
