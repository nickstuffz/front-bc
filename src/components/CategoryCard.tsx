import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CompatComponent } from "@/components/CompatComponent.tsx";
import { CompatComponentType } from "@/types/types.ts";
import { Separator } from "@/components/ui/separator";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelectedCodes } from "@/components/SelectedCodesContext";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export function CategoryCard({ category, catCardData }: CategoryCardProps) {
  const selectedCodes = useSelectedCodes();
  let prevPodId: number | null = null;
  return (
    <AccordionItem value={category}>
      <Card className="m-0 flex flex-col gap-0 rounded-sm border-none p-0 shadow-none">
        <AccordionTrigger className="px-2">
          <CardTitle>{category}s</CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="m-0 p-0">
            <ul className="flex list-none flex-col gap-0">
              {catCardData.map((compatComponent) => {
                const showSeparator =
                  prevPodId !== null && prevPodId !== compatComponent.pod_id;
                prevPodId = compatComponent.pod_id;

                const isPressed = selectedCodes.includes(compatComponent.code)
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
