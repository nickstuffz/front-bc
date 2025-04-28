import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CompatComponent } from "@/components/CompatComponent.tsx";
import { CompatComponentType } from "@/types/types.ts";
import { Separator } from "@/components/ui/separator";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelectedCodes } from "@/providers/selectedCodesContext";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export function CategoryCard({ category, catCardData }: CategoryCardProps) {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context

  // Create a Set from selectedCodes
  const selectedCodesSet = new Set(
    selectedCodes.map((codeObj) => codeObj.code),
  );

  // Calculate showCheck boolean for AccordionItem, shows if any of the compatComponents in this category are selected
  const showCheck = catCardData.some((compatComponent) =>
    selectedCodesSet.has(compatComponent.code),
  );

  // Reducer function to calculate list content, renders Separator if necessary
  const { items: ContentList } = catCardData.reduce(
    (acc, compatComponent) => {
      const showSeparator =
        acc.prevPodId !== null && acc.prevPodId !== compatComponent.pod_id; // Separator conditional, shows if pod id changes
      if (showSeparator) {
        acc.items.push(
          <Separator
            key={`separator-${compatComponent.id}`}
            className="bg-accent-foreground"
          />,
        );
      }
      const isPressed = selectedCodesSet.has(compatComponent.code); // Compat component toggle state, on if in selectedCodes
      acc.items.push(
        <li key={compatComponent.id} className="m-0 p-0">
          <CompatComponent
            compCompData={compatComponent}
            isPressed={isPressed}
          />
        </li>,
      );
      acc.prevPodId = compatComponent.pod_id; // Update previous pod id
      return acc;
    },
    { items: [] as React.ReactNode[], prevPodId: null as number | null }, // Initial accumulator object
  );

  return (
    <AccordionItem className="flex-1 md:border-none" value={category}>
      <Card className="m-0 flex flex-col gap-0 rounded-sm border-none p-0 shadow-none">
        <AccordionTrigger className="flex gap-4 px-2">
          <div className="flex min-h-7 flex-1 items-center justify-start gap-2">
            <CardTitle>{category}s</CardTitle>
            <Check
              className={cn(
                "w-3",
                "transition-opacity",
                showCheck ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="divide-1 m-0 p-0">
            <ul className="flex list-none flex-col gap-4 md:gap-2">
              {ContentList}
            </ul>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
}
