export interface GenerateResponse {
  sessionId: string;
  recordId: string;
  promptId: string;
  imageUrl: string;
  qrCode: string;
  status: string;
  errorMessage: string;
  progress: number;
}
