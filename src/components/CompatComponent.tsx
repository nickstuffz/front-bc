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
  const dispatch = useSelectedCodesDispatch(); // Consume selectedCodes dispatch function from context
  const [isExpanded, setIsExpanded] = React.useState(false); // Basic state for expanded/collapsed state of compat component

  // Handle toggle function to dispatch appropriate action
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

  // NOTE: this compCompData category used in handleToggle is pulled from the compatData query: CompatComponentType
  // whereas selectedCodes is pulled from the allCodes query: CodeObjType
  // the SQL query on the backend ensure they will be the sam, as the categories are pulled from the same table.

  // Variant note categories are used to determine the display location of note. Variant notes are notes that spec the specific component itself,
  // whereas other notes describe the spec of a component it is compatible with.
  // Conveniently, variant notes are of the following categories, so this is used to delineate them
  const variantNoteCategories = ["bottom bracket", "cassette", "crankset"];
  const isVariantNote = variantNoteCategories.includes(compCompData.category);

  return (
    <div className="compat_component flex items-start gap-2">
      {compCompData.warning || (compCompData.note && !isVariantNote) ? (
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
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary data-[state=on]:hover:bg-primary/80 relative flex h-auto w-full items-start justify-between gap-0 rounded-sm border px-2 py-0"
      >
        <div className="flex flex-1 flex-col items-start gap-0 py-2.5 text-start">
          <small className="ml-1">{compCompData.code}</small>
          {isExpanded && (
            <>
              <p className="mt-2 text-wrap">{compCompData.note}</p>
              {compCompData.warning && (
                <p className="mt-2 text-wrap">{"# " + compCompData.warning}</p>
              )}
            </>
          )}
        </div>
        <div className="absolute top-0 right-2 flex flex-col items-end justify-start gap-1.5 pt-1">
          <p className="text-[0.62rem]">{compCompData.status}</p>
          {!isExpanded && isVariantNote && (
            <p className="text-[0.62rem]">{compCompData.note}</p>
          )}
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
