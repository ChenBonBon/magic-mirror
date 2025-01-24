export interface Payment {
  QRCode: string;
  billNo: string;
  skip: boolean;
  totalPrice: number;
}
