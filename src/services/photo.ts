import { Gender } from "../components/ai-photo/Attributes.vue";
import http from "../http";
import { HTTPResponse } from "../models/http";
import {
  Generate3DResponse,
  GenerateRecord,
  GenerateResponse,
  Posture,
} from "../models/photo";

export async function generateImage(image: Blob, key: string) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/image/generate",
    {
      clientId: window.localStorage.getItem("magic-mirror-sessionId"),
      workflowType: "cute",
      image,
      "params[STYLE]": key,
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

export async function generateAI(image: Blob, key: string, gender: Gender) {
  const res = await http.post<HTTPResponse<GenerateResponse>>(
    "/image/generate",
    {
      clientId: window.localStorage.getItem("magic-mirror-sessionId"),
      workflowType: "aiPhoto",
      image,
      "params[STYLE]": key,
      gender,
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

export async function getCutePostures() {
  const res = await http.get<HTTPResponse<Posture>>("/categories/cute");

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}

export async function getAIPostures() {
  const res = await http.get<HTTPResponse<Posture[]>>("/categories/ai");

  if (res.data && res.data.code === 200) {
    return res.data.data;
  }
}
