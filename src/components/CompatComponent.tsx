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

  const Expander =
    compCompData.warning || (compCompData.note && !isVariantNote) ? (
      <button
        className=""
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <Minimize className="size-5" />
        ) : (
          <Maximize className="size-5" />
        )}
      </button>
    ) : (
      <div className="">
        <Maximize className="text-muted size-5" />
      </div>
    );

  const LinkOut = compCompData.link ? (
    <a target="_blank" href={compCompData.link} rel="noreferrer" className="">
      <SquareArrowOutUpRight className="size-4.5" />
    </a>
  ) : (
    <div className="">
      <SquareArrowOutUpRight className="text-muted size-4.5" />
    </div>
  );

  return (
    <div className="compat_component md:border-primary/50 @container flex items-stretch justify-center gap-2 md:gap-1.5 md:rounded-lg md:border md:border-dotted md:px-1.5 md:py-2">
      <Toggle
        pressed={isPressed}
        onPressedChange={handleToggle}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary data-[state=on]:hover:bg-primary/80 m-0 flex h-auto w-full flex-col gap-0 rounded-sm border p-0.5 @[210px]:p-1"
      >
        <div className="grid w-full grid-rows-3 gap-0 p-0 text-nowrap">
          <p className="self-start text-end text-[0.6rem] @[210px]:text-[0.69rem]">
            {compCompData.status}
          </p>
          <small className="my-0.5 self-center text-center text-[0.72rem] @[210px]:text-[0.8rem] @xs:text-[0.95rem]">
            {compCompData.code}
          </small>
          {!isExpanded && isVariantNote && (
            <p className="self-end text-end text-[0.6rem] @[210px]:text-[0.69rem]">
              {compCompData.note}
            </p>
          )}
        </div>
        {isExpanded && (
          <div>
            <p className="text-[0.54rem] text-wrap @[210px]:text-[0.6rem]">
              {compCompData.note}
            </p>
            {compCompData.warning && (
              <p className="mt-1 text-[0.54rem] text-wrap @[210px]:text-[0.6rem]">
                {"# " + compCompData.warning}
              </p>
            )}
          </div>
        )}
      </Toggle>
      <div className="flex flex-col justify-start gap-2.5 py-0.5 @[210px]:gap-4.5">
        {LinkOut}
        {Expander}
      </div>
    </div>
  );
}

// status
// 2xs:text-xs xs:mr-1.5 self-start text-end text-[0.62rem] md:mr-0.5 md:text-[0.6rem]

// code
// self-center text-center md:ml-0 md:py-0.5 md:text-[0.7rem] lg:py-0 lg:text-sm

// note
// 2xs:text-xs xs:mr-1.5 self-end text-end text-[0.62rem] md:mr-0.5 md:text-[0.6rem]

// expanded:
//  note
// text-wrap md:text-[0.54rem]
//  warning
// mt-1 text-wrap md:text-[0.54rem]
