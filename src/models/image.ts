export interface GenerateStatus {
  status: "pending" | "success" | "failed";
}

export interface GeneratedImage {
  image_id: number;
  image_url: string;
}

export interface PhotoFrame {
  color: string;
  createTime: string;
  id: number;
  imageId: string;
  imageUrl: string;
  material: string;
  name: string;
  size: string;
  style: string;
  updateTime: string;
}
