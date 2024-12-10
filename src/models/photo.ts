export interface GenerateRecord {
  promptId: string;
  imageUrl: string;
  qrCode: string;
  status: string;
  imageUrls: string[];
  modelUrls: string[];
}

export interface GenerateResponse extends GenerateRecord {
  history: GenerateRecord[];
}

export interface Generate3DRecord {
  promptId: string;
  status: string;
  modelUrls: string[];
}

export interface Generate3DResponse extends Generate3DRecord {
  history: Generate3DRecord[];
}
