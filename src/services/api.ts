import { CompatComponentType } from "@/types/types.ts";
import axios from "axios";

export async function fetchCompatData(
  code: string,
): Promise<CompatComponentType> {
  const response = await axios.get(
    `http://localhost:8080/api/compatibility?code=${code}`,
  );
  return response.data;
}
