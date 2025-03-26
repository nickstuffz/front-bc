import { CompatDataResponse } from "@/types/types.ts";
import axios from "axios";

export async function fetchCompatData(
  code: string,
): Promise<CompatDataResponse> {
  const response = await axios.get(
    `http://localhost:8080/api/compatibility?code=${code}`,
  );
  return response.data;
}

export async function fetchAllCodes(): Promise<{ code: string }[]> {
  const response = await axios.get(
    "http://localhost:8080/api/components/codes",
  );
  return response.data;
}
