import { CompDataResponse, CodeObjType } from "@/types/types.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCompatData(code: string): Promise<CompDataResponse> {
  const response = await axios.get(`${API_URL}/api/compatibility?code=${code}`);
  return response.data;
}

export async function fetchAllCodes(): Promise<CodeObjType[]> {
  console.log(API_URL);
  const response = await axios.get(`${API_URL}/api/components/codes`);
  return response.data;
}
