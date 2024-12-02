import http from "../http";
import { HTTPResponse } from "../models/http";
import { GenerateResponse } from "../models/photo";

export async function generateImage(photo: string, postureIndex: number) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/api/generate",
    {
      workflowType: "cute",
      originImage: photo,
      styleAlias1: "cute" + postureIndex,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data && res.data.success) {
    return res.data.data;
  }
}

export async function generate3D(photo: string) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/api/generate",
    {
      workflowType: "aiPhoto",
      originImage: photo,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data && res.data.success) {
    return res.data.data;
  }
}
