import { CompatComponentType } from "@/types/types.ts";
import { Toggle } from "@/components/ui/toggle";

interface CompatComponentProps {
  compCompData: CompatComponentType;
}

export function CompatComponent({ compCompData }: CompatComponentProps) {
  return (
    <div className="compat_component flex flex-col py-2">
      <Toggle className="m-0 h-auto w-full p-0">
        <small className="m-0 p-0">{compCompData.code}</small>
      </Toggle>
      <small className="text-xs">{compCompData.note}</small>
    </div>
  );
}
