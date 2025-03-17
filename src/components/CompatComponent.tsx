import { CompatComponentType } from "../types/types.ts";

interface CompatComponentProps {
  compCompData: CompatComponentType;
}

export default function CompatComponent({
  compCompData,
}: CompatComponentProps) {
  return <li>{compCompData.code}</li>;
}
