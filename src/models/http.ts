export interface HTTPResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}
