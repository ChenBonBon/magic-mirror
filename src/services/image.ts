import type { CartItem } from "../models/cart";
import type {
  GeneratedImage,
  GenerateStatus,
  PhotoFrame,
} from "../models/image";
import { request } from "../request";

export async function generate(image: Blob, styleId: string) {
  const res = await request.post(
    "/image/generate",
    {
      customer_photo: image,
      style_id: styleId,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
}

export async function getGenerateStatus() {
  const res = await request.get<GenerateStatus>("/image/getImageStatus");

  return res;
}

export async function getGeneratedImages() {
  const res = await request.get<GeneratedImage[]>("/image/getImage");

  return res;
}

export async function getPhotoFrames() {
  const res = await request.get<PhotoFrame[]>("/photoframes");

  return res;
}

export async function combineImages(imageId: number, wrapperId: number) {
  const res = await request.post<CartItem[]>("/combine-images", {
    image_id: imageId,
    frame_id: wrapperId,
  });

  return res;
}

export async function getUploadImages() {
  const res = await request.get("/image/getImage");

  return res;
}
