import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface CommandSearchProps {
  allCodes: { code: string }[];
  selectedCodes: string[];
  setSelectedCodes: (selectedCodes: string[]) => void;
}

export function CommandSearch({
  allCodes,
  selectedCodes,
  setSelectedCodes,
}: CommandSearchProps) {
  const [open, setOpen] = React.useState(false);

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
      <p className="text-muted-foreground text-sm">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search component codes..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {allCodes.map((currentCode) => (
              <CommandItem
                key={currentCode.code}
                value={currentCode.code}
                onSelect={(value) => {
                  const isSelected = selectedCodes.includes(value); // check if code already selected

                  const updatedSelectedCodes = isSelected
                    ? selectedCodes.filter((code) => code !== value) // remove code
                    : [...selectedCodes, value]; // add code

                  setSelectedCodes(updatedSelectedCodes); // update selected codes

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
          <CommandGroup heading="shifters"></CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// Future Features:
// Group by category, collapsible menu?
// Set selected codes to show first at the top of results.
