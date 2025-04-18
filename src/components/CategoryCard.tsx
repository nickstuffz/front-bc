import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CompatComponent } from "@/components/CompatComponent.tsx";
import { CompatComponentType } from "@/types/types.ts";
import { Separator } from "@/components/ui/separator";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export function CategoryCard({ category, catCardData }: CategoryCardProps) {
  const selectedCodes = useSelectedCodes();

  let prevPodId: number | null = null;

  const selectedCodesSet = new Set(
    selectedCodes.map((codeObj) => codeObj.code),
  );

  const showCheck = catCardData.some((compatComponent) =>
    selectedCodesSet.has(compatComponent.code),
  );

  return (
    <AccordionItem value={category}>
      <Card className="m-0 flex flex-col gap-0 rounded-sm border-none p-0 shadow-none">
        <AccordionTrigger className="flex gap-4 px-2">
          <div className="flex flex-1 items-center justify-start gap-2">
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
          <CardContent className="m-0 p-0">
            <ul className="flex list-none flex-col">
              {catCardData.map((compatComponent) => {
                const showSeparator =
                  prevPodId !== null && prevPodId !== compatComponent.pod_id;
                prevPodId = compatComponent.pod_id;

                const isPressed = selectedCodesSet.has(compatComponent.code)
                  ? true
                  : false;

                return (
                  <div key={compatComponent.id}>
                    {showSeparator && (
                      <Separator className="bg-accent-foreground my-2" />
                    )}
                    <li className="m-0 p-0">
                      <CompatComponent
                        compCompData={compatComponent}
                        isPressed={isPressed}
                      />
                    </li>
                  </div>
                );
              })}
            </ul>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
}
