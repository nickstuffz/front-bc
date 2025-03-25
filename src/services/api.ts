import { CompatComponentType } from "@/types/types.ts";
import axios from "axios";

interface CompatDataResponse {
  code: string;
  compData: CompatComponentType[];
}

export async function fetchCompatData(
  code: string,
): Promise<CompatDataResponse> {
  const response = await axios.get(
    `http://localhost:8080/api/compatibility?code=${code}`,
  );
  return response.data;
}
