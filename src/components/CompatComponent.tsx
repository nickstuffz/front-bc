import { CompatComponentType } from "@/types/types.ts";
import { Toggle } from "@/components/ui/toggle";
import { useSelectedCodesDispatch } from "@/lib/selectedCodeContext";

interface CompatComponentProps {
  compCompData: CompatComponentType;
  isPressed: boolean;
}

export function CompatComponent({
  compCompData,
  isPressed,
}: CompatComponentProps) {
  const dispatch = useSelectedCodesDispatch();

  function handleToggle() {
    if (isPressed) {
      dispatch({ type: "deleted", code: compCompData.code });
    } else {
      dispatch({ type: "added", code: compCompData.code });
    }
  }

  return (
    <div className="compat_component flex flex-col py-2">
      <Toggle
        pressed={isPressed}
        onPressedChange={handleToggle}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground m-0 flex w-full justify-between rounded-xs border border-dotted p-0 px-4"
      >
        <small className="m-0 p-0">{compCompData.code}</small>
        <p className="text-[10px] leading-none">{compCompData.note}</p>
      </Toggle>
    </div>
  );
}
