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
    <div className="compat_component md:border-primary/50 flex items-start justify-center gap-2 md:gap-1.5 md:rounded-lg md:border md:border-dotted md:px-1.5 md:py-2">
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
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary data-[state=on]:hover:bg-primary/80 m-0 flex h-auto w-full max-w-84 flex-col gap-0 rounded-sm border p-1 md:p-0.5"
      >
        <div className="grid w-full grid-rows-3 gap-0 p-0 text-nowrap">
          <p className="xs:text-xs xs:mr-1.5 text-end text-[0.62rem] md:mr-0 md:text-[0.6rem]">
            {compCompData.status}
          </p>
          <small className="2xs:text-center ml-4 self-center text-start md:ml-0 md:text-start md:text-[0.7rem]">
            {compCompData.code}
          </small>
          {!isExpanded && isVariantNote && (
            <p className="xs:text-xs xs:mr-1.5 self-end text-end text-[0.62rem] md:mr-0 md:text-[0.6rem]">
              {compCompData.note}
            </p>
          )}
        </div>

        {isExpanded && (
          <div>
            <p className="text-wrap md:text-[0.54rem]">{compCompData.note}</p>
            {compCompData.warning && (
              <p className="mt-1 text-wrap md:text-[0.54rem]">
                {"# " + compCompData.warning}
              </p>
            )}
          </div>
        )}
      </Toggle>
      {compCompData.link ? (
        <a
          target="_blank"
          href={compCompData.link}
          rel="noreferrer"
          className="mt-2.5 ml-1 md:ml-0"
        >
          <SquareArrowOutUpRight className="h-4.5 w-4.5" />
        </a>
      ) : (
        <div className="mt-2.5 ml-1 md:ml-0">
          <SquareArrowOutUpRight className="text-muted h-4.5 w-4.5" />
        </div>
      )}
    </div>
  );
}
