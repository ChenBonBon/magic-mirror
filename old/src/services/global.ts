import type { Style, StyleModel } from "../models/global";
import { request } from "../request";

export default function getCarouselImages() {
  return request.get<string[]>("/cate/get-carousel-images");
}

export async function getStyles(modelId: StyleModel, moduleId: number) {
  const res = await request.get<Style[]>("/cate/get-style-images", {
    params: {
      model_id: modelId,
      module_id: moduleId,
    },
  });

  return res;
}
