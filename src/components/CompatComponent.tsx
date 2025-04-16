import { CompatComponentType } from "@/types/types.ts";
import { Toggle } from "@/components/ui/toggle";
import { useSelectedCodesDispatch } from "@/lib/selectedCodeUtils";
import { SquareArrowOutUpRight, Maximize2 } from "lucide-react";

interface CompatComponentProps {
  compCompData: CompatComponentType;
  isPressed: boolean;
}

export function CompatComponent({
  compCompData,
  isPressed,
}: CompatComponentProps) {
  const dispatch = useSelectedCodesDispatch();

  // NOTE: this compCompData category is pulled from the compatData query: CompatComponentType
  // whereas selectedCodes is pulled from the allCodes query: CodeObjType
  // the SQL query on the backend ensure they will be the sam, as the categories are pulled from the same table.

  // const hasLink = compCompData.link;

  function handleToggle() {
    if (isPressed) {
      dispatch({
        type: "deleted",
        codeObj: { code: compCompData.code, category: compCompData.category },
      });
    } else {
      dispatch({
        type: "added",
        codeObj: { code: compCompData.code, category: compCompData.category },
      });
    }
  }

  return (
    <div className="compat_component flex items-center gap-4 py-2">
      <Toggle
        pressed={isPressed}
        onPressedChange={handleToggle}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary m-0 flex w-full justify-between rounded-sm border border-dotted p-0 px-4"
      >
        <small className="m-0 p-0">{compCompData.code}</small>
        <p className="text-[10px] leading-none">{compCompData.note}</p>
      </Toggle>
      <Maximize2 className="w-4" />
    </div>
  );
}

//                            open link JSX
// {hasLink ? (
//   <a target="_blank" href={compCompData.link} rel="noreferrer">
//     <SquareArrowOutUpRight className="w-4" />
//   </a>
// ) : (
//   <div>
//     <SquareArrowOutUpRight className="text-muted w-4" />
//   </div>
// )}
