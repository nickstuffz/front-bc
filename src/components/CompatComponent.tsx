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
      {compCompData.warning ? (
        <button
          className="mt-2.5 mr-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize className="h-4.5 w-4.5" />
          ) : (
            <Maximize className="h-4.5 w-4.5" />
          )}
        </button>
      ) : (
        <div className="mt-2.5 mr-1">
          <Maximize className="text-muted h-4.5 w-4.5" />
        </div>
      )}

      <Toggle
        pressed={isPressed}
        onPressedChange={handleToggle}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary data-[state=on]:hover:bg-primary/80 flex h-auto w-full items-start justify-between rounded-sm border px-2 py-0"
      >
        <div className="flex flex-1 flex-col items-start gap-0 py-2.5">
          <small className="m-0">{compCompData.code}</small>
          {isExpanded && (
            <>
              <p className="mt-2">{compCompData.note}</p>
              {compCompData.warning && (
                <p className="mt-2">{"# " + compCompData.warning}</p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col items-end justify-start gap-1.5 pt-1">
          <p className="text-[0.62rem]">{compCompData.status}</p>
          {!isExpanded && <p className="text-[0.62rem]">{compCompData.note}</p>}
        </div>
      </Toggle>
      {compCompData.link ? (
        <a
          target="_blank"
          href={compCompData.link}
          rel="noreferrer"
          className="mt-2.5 ml-1"
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
