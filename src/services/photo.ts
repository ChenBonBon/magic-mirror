import http from "../http";
import { HTTPResponse } from "../models/http";
import {
  Generate3DResponse,
  GenerateRecord,
  GenerateResponse,
} from "../models/photo";

export async function generateImage(image: Blob, styleIndex: number) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/image/generate",
    {
      clientId: window.localStorage.getItem("magic-mirror-sessionId"),
      workflowType: "cute",
      image,
      "params[STYLE]": "STYLE_" + styleIndex,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}

export async function generateAI(image: Blob, styleIndex: number) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/image/generate",
    {
      clientId: window.localStorage.getItem("magic-mirror-sessionId"),
      workflowType: "aiPhoto",
      image,
      "params[STYLE]": "REALISTIC_1",
      "params[ACTION]": "ACTION_1",
      "params[POSE]": "POSE_1",
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}

export async function generate3D(imgUrl: string) {
  const res = await http.post<HTTPResponse<Generate3DResponse>>(
    "/image/generate",
    {
      clientId: window.localStorage.getItem("magic-mirror-sessionId"),
      imgUrl,
      workflowType: "To3d",
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}

export async function getImageRecords() {
  const res = await http.get<HTTPResponse<GenerateRecord[]>>(
    "/session/history"
  );

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
