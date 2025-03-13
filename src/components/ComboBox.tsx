import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboBoxProps {
  allCodes: { code: string }[];
  selectedCode: string;
  setSelectedCode: (selectedCode: string) => void;
}

export default function ComboBox({
  allCodes,
  selectedCode,
  setSelectedCode,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  // console.log("ComboBox rendered");
  // console.log("selectedCode", selectedCode);

  // if (allCodes.length === 0) {
  //   console.log("no codes");
  // } else {
  //   console.log("codes found");
  // }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCode
            ? allCodes.find((currentCode) => currentCode.code === selectedCode)
                ?.code
            : "select component..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="search components..." />
          <CommandList>
            <CommandEmpty>no component found</CommandEmpty>
            <CommandGroup>
              {allCodes.map((currentCode) => (
                <CommandItem
                  key={currentCode.code}
                  value={currentCode.code}
                  onSelect={(value) => {
                    setSelectedCode(value === selectedCode ? "" : value);

                    // console.log("selectedCode set");

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCode === currentCode.code
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {currentCode.code}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
