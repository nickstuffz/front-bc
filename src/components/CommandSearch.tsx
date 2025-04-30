import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  useSelectedCodes,
  useSelectedCodesDispatch,
} from "@/providers/selectedCodesContext";
import { CodeObjType } from "@/types/types";

interface CommandSearchProps {
  allCodes: CodeObjType[];
}

export function CommandSearch({ allCodes }: CommandSearchProps) {
  const [open, setOpen] = React.useState(false); // Basic state for open/closed state of command search dialog modal
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const dispatch = useSelectedCodesDispatch(); // Consume selectedCodes dispatch function from context

  // Available codes calculation by filtering out selected codes from all codes
  const availableCodes = React.useMemo(() => {
    const selectedCodesSet = new Set(
      selectedCodes.map((codeObj) => codeObj.code),
    );
    return allCodes.filter((codeObj) => !selectedCodesSet.has(codeObj.code));
  }, [allCodes, selectedCodes]);

  // Handle keydown event to toggle command search dialog modal state
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        className="border-accent-foreground 2xs:text-xs 2xs:px-3 h-auto px-2 text-xs text-[0.62rem] font-stretch-expanded"
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        Search Components...
        <small className="text-muted-foreground xs:block hidden text-xs">
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-base">⌘</span>J
          </kbd>
        </small>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className="" placeholder="Search component codes..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {selectedCodes.length > 0 && (
            <>
              <CommandGroup heading="selected codes">
                {selectedCodes.map((codeObj) => (
                  <CommandItem
                    className="flex items-center justify-between"
                    key={codeObj.code}
                    value={codeObj.code}
                    onSelect={() => {
                      dispatch({
                        type: "deleted",
                        codeObj: codeObj,
                      });
                    }}
                  >
                    <div className="flex items-center gap-1 pl-2">
                      <Check className={cn("mr-2 h-4 w-4", "opacity-100")} />
                      <small>{codeObj.code}</small>
                    </div>
                    <small className="text-primary pr-3 text-xs">
                      {codeObj.category}
                    </small>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          <CommandGroup heading="available codes">
            {availableCodes.map((codeObj) => (
              <CommandItem
                className="flex items-center justify-between"
                key={codeObj.code}
                value={codeObj.code}
                onSelect={() => {
                  dispatch({
                    type: "added",
                    codeObj: codeObj,
                  });
                }}
              >
                <div className="flex items-center gap-1 pl-2">
                  <Check className={cn("mr-2 h-4 w-4", "opacity-0")} />
                  <small>{codeObj.code}</small>
                </div>
                <small className="text-primary pr-3 text-xs">
                  {codeObj.category}
                </small>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
