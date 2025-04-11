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
} from "@/lib/selectedCodeUtils";

interface CommandSearchProps {
  allCodes: { code: string }[];
}

export function CommandSearch({ allCodes }: CommandSearchProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCodes = useSelectedCodes();
  const dispatch = useSelectedCodesDispatch();

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
        className="px-2 text-xs"
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        Search components...
        <p className="text-muted-foreground text-xs">
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-sm">⌘</span>J
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search component codes..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandSeparator />
            {allCodes.map((currentCode) => (
              <CommandItem
                key={currentCode.code}
                value={currentCode.code}
                onSelect={(value) => {
                  const isSelected = selectedCodes.includes(value); // check if code already selected

                  // dispatch an action to add or remove the code
                  if (isSelected) {
                    dispatch({ type: "deleted", code: value }); // remove the code
                  } else {
                    dispatch({ type: "added", code: value }); // add the code
                  }

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCodes.includes(currentCode.code)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {currentCode.code}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
