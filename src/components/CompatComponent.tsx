import * as React from "react";
import { CompatComponentType } from "@/types/types.ts";
import { Toggle } from "@/components/ui/toggle";
import { useSelectedCodesDispatch } from "@/lib/selectedCodeUtils";
import { SquareArrowOutUpRight, Maximize, Minimize } from "lucide-react";

interface CompatComponentProps {
  compCompData: CompatComponentType;
  isPressed: boolean;
}

export function CompatComponent({
  compCompData,
  isPressed,
}: CompatComponentProps) {
  const dispatch = useSelectedCodesDispatch();
  const [isExpanded, setIsExpanded] = React.useState(false);

  // NOTE: this compCompData category is pulled from the compatData query: CompatComponentType
  // whereas selectedCodes is pulled from the allCodes query: CodeObjType
  // the SQL query on the backend ensure they will be the sam, as the categories are pulled from the same table.

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
    <div className="compat_component my-2 flex items-start gap-2">
      <button className="mt-2 pr-1" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? (
          <Minimize className="h-4.5 w-4.5" />
        ) : (
          <Maximize className="h-4.5 w-4.5" />
        )}
      </button>

      <Toggle
        pressed={isPressed}
        onPressedChange={handleToggle}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary data-[state=on]:hover:bg-primary/80 flex h-auto min-h-0 w-full items-start justify-between rounded-sm border border-dotted px-3 py-2.5"
      >
        {isExpanded ? (
          <>
            <div className="flex flex-1 flex-col items-start gap-0 text-start text-wrap">
              <small className="m-0">{compCompData.code}</small>
              <p className="mt-2">{compCompData.note}</p>
              <p className="mt-2">
                {compCompData.warning ? "# " + compCompData.warning : null}
              </p>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <small>{compCompData.code}</small>
            <div className="flex flex-col items-start justify-between">
              <p>{compCompData.status}</p>
              <p>{compCompData.note}</p>
            </div>
          </>
        )}
      </Toggle>
      {compCompData.link ? (
        <a
          target="_blank"
          href={compCompData.link}
          rel="noreferrer"
          className="mt-2 pl-1"
        >
          <SquareArrowOutUpRight className="h-4.5 w-4.5" />
        </a>
      ) : (
        <div className="mt-2 pl-1">
          <SquareArrowOutUpRight className="text-muted h-4.5 w-4.5" />
        </div>
      )}
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
