export type PrintStatus = "success" | "error" | "picnotfound";

export interface PrintRes {
  status: PrintStatus;
}
