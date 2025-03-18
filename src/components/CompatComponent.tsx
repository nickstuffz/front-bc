import { CompatComponentType } from "../types/types.ts";

interface CompatComponentProps {
  compCompData: CompatComponentType;
}

export default function CompatComponent({
  compCompData,
}: CompatComponentProps) {
  return <li className="border-2">{compCompData.code}</li>;
}
