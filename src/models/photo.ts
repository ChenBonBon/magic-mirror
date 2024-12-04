export interface GenerateRecord {
  promptId: string;
  imageUrl: string;
  qrCode: string;
  status: "completed";
  modelUrls: string[];
}

export interface GenerateResponse extends GenerateRecord {
  history: GenerateRecord[];
}

export interface Generate3DResponse {
  promptId: string;
  status: string;
  modelUrls: string[];
}
